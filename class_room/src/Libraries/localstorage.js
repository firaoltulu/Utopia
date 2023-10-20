async function modeStorageSet(mode = null) {

    if (mode !== null) {
        var loc_mode = JSON.parse(localStorage.getItem("mode"));

        if (loc_mode) {

            try {


                loc_mode.Title = mode.Title;
                loc_mode.Type = mode.Type;

                localStorage.setItem("mode", JSON.stringify(loc_mode));

            } catch (e) {

                console.log("The Object already exist in the list");
                return false;

            }

        }
        else {

            var new_mode = Object.assign({}, {
                Title: mode.Title,
                Type: mode.Type,
                addeddate: new Date().toISOString(),

            });

            localStorage.setItem("mode", JSON.stringify(new_mode));

        }

    }
    else {
        return 0;
    }

};

function modeStorageGet() {
    var loc_mode = JSON.parse(localStorage.getItem("mode"));
    if (loc_mode) {
        return loc_mode;
    }
    else {
        return null;
    }

}

export {
    modeStorageGet,
    modeStorageSet
}

