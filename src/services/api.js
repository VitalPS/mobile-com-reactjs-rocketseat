import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.103:3333",
});

export default api;

// iOS com emulador: localhost
// iOS com físico: IP da maquina
// android com Emulador: usar local host, depois de usar o comando "adb reverse tcp:3333 tcp:3333"
// android com Emulador: 10.0.2.2 (Android Studio)
// android com emulador: 10.0.3.2 (Genymotion)
// Android com físico: IP da maquina
