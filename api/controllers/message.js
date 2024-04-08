const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./storage");
localStorage.setItem("credentials", "[]");
localStorage.setItem("messages", "[]");


// Función para obtener un ID único
const getId = () => {
    const min = 100,
        max = 999;

    let rnd;
    let findMessage;

    do {
        rnd = Math.floor(Math.random() * (max - min + 1) + min);
        const messages = JSON.parse(localStorage.getItem("messages"));
        findMessage = messages.find((e) => e.id == rnd);
    } while (findMessage || !rnd);

    return rnd;
};

exports.messagePost = async (req, res) => {
    const body = req.body;
    const message = req.body.message;
    const tags = req.body.tags;

    const id = getId();
    const postMessage = { id, message, tags };
    const messages = JSON.parse(localStorage.getItem("messages"));

    messages.push(postMessage);
    localStorage.setItem("messages", JSON.stringify(messages));

    res.status(200).json({
        status: true,
        id: id,
        body: body,
    });
}
exports.messageGetId = async (req, res) => {
    const { id } = req.params;

    const messages = JSON.parse(localStorage.getItem("messages"));
    const findMsg = messages.find((e) => e.id == id);

    if (findMsg) {
        res.status(200).json({
            status: true,
            id: id,
            msg: findMsg,
        });
    } else {
        res.status(404).json({
            status: false,
            msg: "No Encontrado",
        });
    }
}

exports.messageGetTags = async (req, res) => {
    const { tag } = req.params;

    //   var tag = req.params.tag;
    const messages = JSON.parse(localStorage.getItem("messages"));
    const tagLow = tag.toLowerCase();

    let messagesFinded = [];

    messages.forEach((e) => {
        tagsLow = e.tags.toLowerCase();
        if (tagsLow.includes(tagLow)) {
            messagesFinded.push(e);
        }
    });

    if (messagesFinded.length > 0) {
        res.status(200).json({
            status: true,
            msgs: messagesFinded,
        });
    } else {
        res.status(404).json({
            status: false,
            msg: "No Encontrado",
        });
    }
}
exports.messageGet = async (req, res) => {
    const messages = JSON.parse(localStorage.getItem("messages"));
    
    if (messages.length > 0) {
      res.status(200).json({
        status: true,
        msgs: messages,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "No Encontrado",
      });
    }
}