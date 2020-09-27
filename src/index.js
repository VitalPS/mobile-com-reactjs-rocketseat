import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";

import api from "./services/api";

// Não possuem valor semântico (significado)
// Não possuem estilização própria (tudo precisa ser feito em CSS)
// Todos componentes possuem por padrão "display: flex"
// Não existe herança de estilo -> precisa aplicar ao texto especificamente

//View = div, footer, header, main, aside, section...
// Text = p, span, strong, h1, h2, h3...

export default function App() {
  const [projects, setProjects] = useState([]); //useState -> array vazio no React

  useEffect(() => {
    api.get("projects").then((response) => {
      setProjects(response.data);
    });
  }, []); // useEffect chama uma função toda vez que algo neste array ocorre (se não tiver nada, chama uma vez apenas)

  async function handleAddProject() {
    const response = await api.post("projects", {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Patrik da Silva",
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <SafeAreaView style={styles.container}>
        {/**SafeAreaView impede texto de comecar onde fica o marcador de bateria */}
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item }) => (
            <Text style={styles.project}>{item.title}</Text>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* <ScrollView style={styles.container}>
        {projects.map((project) => (
          <Text style={styles.project} key={project.id}>
            {project.title}
          </Text>
        ))}
      </ScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
    // justifyContent: "center",
    // alignItems: "center",
  },
  project: {
    color: "#fff",
    fontSize: 20,
    paddingBottom: 50,
  },
  button: {
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

// Para ter a opção de scroll (mover para cima e para baixo no celular), você pode:
// 1- trocar view por ScrollView (lembrar de tirar justifyContent e alignItems) - não usar em listas
// 2 - propriedade FlatList (é beeem mais performatica do que ScrollView, pois renderiza apenas os itens na tela)
// Tem várias outras funções, como recarregamento ao scrollar para baixo

// Para colocar botão você pode importar:
// Button -> tem estilização própria
// Touchable (existem vários) -> estilização depende do tipo de Touchable você escolher
