const json = require('./data.js');
const users = json.results;
const MAX = users.length;

const RandomUser = function () {
    this.evaluate = function () {
        return getObject(users[getRandomInt()], this.fieldType);
    }
    this.title = function() {
        return this.fieldType ? `Random ${this.fieldType}` : 'Choose field';
    }
}

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(MAX));
}

function getObject(obj, pathString) {
    if (!pathString) {
        return '';
    }

    const path = pathString.split('.');
    for (let key of path) {
        obj = obj[key];
    }
    return obj;
}

function buildSelectOptions() {
    function buildOptions(obj, path, options) {
        if (!obj) {
            return;
        }

        Object.keys(obj).forEach(key => {
            const type = typeof obj[key];

            if (['string', 'number', 'boolean'].indexOf(type) >= 0) {
                const pathString = path.concat(key).join('.');
                options[pathString] = pathString;
            } else if (type === 'object') {
                buildOptions(obj[key], path.concat(key), options);
            }
        });
    }

    const options = {};
    buildOptions(users[getRandomInt()], [], options);
    return options;
}



RandomUser.identifier = "dev.anuragsaini.RandomUser";
RandomUser.title = "Random User";
RandomUser.help = "https://randomuser.me/documentation";

RandomUser.inputs = [
    InputField("fieldType", "Field Type", "Select", {
        persisted: true,
        choices: buildSelectOptions()
    })
];

registerDynamicValueClass(RandomUser);
