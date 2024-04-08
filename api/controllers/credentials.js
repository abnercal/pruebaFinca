const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./storage");
localStorage.setItem("credentials", "[]");

exports.credentialPut = async (req, res) => {
    const { key, shared_secret } = req.body;

    if (key && shared_secret) {
        let credentials = JSON.parse(localStorage.getItem("credentials"));

        // Verify token exists
        if (credentials.find((cred) => cred.key === key)) {
            res.status(403).json({
                status: false,
                message: "Credenciales ya existen",
            });
        } else {
            const aux = { key: key, shared_secret: shared_secret };
            credentials.push(aux);
            localStorage.setItem("credentials", JSON.stringify(credentials));
            res.status(204).json({
                status: true,
                message: "Credenciales Registradas",
            });
        }
    } else {
        res.status(400).json({
            status: false,
            message: "Error, verifique enviar los datos solicitados Key o shared_secret",
        });
    }
};
