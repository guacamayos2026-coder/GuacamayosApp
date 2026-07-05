/**
 * bootstrapAdmin.js
 * ---------------------------------------------------------------
 * Script de UNA SOLA VEZ para crear tu PRIMER usuario administrador.
 * Se ejecuta localmente en tu computadora (no se despliega), porque
 * la Cloud Function setAdminRole exige que quien la llama YA sea
 * admin — y para el primer admin todavía no existe nadie con ese rol.
 *
 * Pasos:
 *   1. En Firebase console > Configuración del proyecto > Cuentas de servicio
 *      genera una "clave privada nueva" y descarga el archivo JSON.
 *   2. Coloca ese archivo junto a este script, por ejemplo como
 *      "serviceAccountKey.json" (NUNCA lo subas a GitHub).
 *   3. Crea primero tu usuario normal desde la app (registro con
 *      correo/contraseña) para obtener su UID (Firebase console >
 *      Authentication > Users).
 *   4. Corre: node bootstrapAdmin.js TU_UID_AQUI
 */

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid = process.argv[2];

if (!uid) {
  console.error("Uso: node bootstrapAdmin.js <UID_DEL_USUARIO>");
  process.exit(1);
}

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`✅ Listo. El usuario ${uid} ahora es administrador.`);
    console.log("Cierra sesión y vuelve a iniciar sesión en la app para que el rol tome efecto.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error asignando el rol de admin:", err);
    process.exit(1);
  });
