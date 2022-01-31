console.log(`
$$$$$$$\\  $$\\  $$$$$$\\
$$  __$$\\ \\__|$$  __$$\\
$$ |  $$ |$$\\ $$ /  \\__| $$$$$$\\  $$\\   $$\\  $$$$$$$\\  $$$$$$\\   $$$$$$\\
$$$$$$$  |$$ |\\$$$$$$\\   \\____$$\\ $$ |  $$ |$$  _____|$$  __$$\\ $$  __$$\\
$$  ____/ $$ | \\____$$\\  $$$$$$$ |$$ |  $$ |$$ /      $$$$$$$$ |$$ |  \\__|
$$ |      $$ |$$\\   $$ |$$  __$$ |$$ |  $$ |$$ |      $$   ____|$$ |
$$ |      $$ |\\$$$$$$  |\\$$$$$$$ |\\$$$$$$  |\\$$$$$$$\\ \\$$$$$$$\\ $$ |
\\__|      \\__| \\______/  \\_______| \\______/  \\_______| \\_______|\\__|
                                                                    ⠀`);
console.log("Interested in this website? Check the github for the source code");

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

jQuery(function($) {

    var Promise = window.Promise;
    if (!Promise) {
        Promise = JSZip.external.Promise;
    }

    /**
     * Fetch the content and return the associated promise.
     * @param {String} url the url of the content to fetch.
     * @return {Promise} the promise containing the data.
     */
    function urlToPromise(url) {
        return new Promise(function(resolve, reject) {
            JSZipUtils.getBinaryContent(url, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    $(document).ready(function() {
        $('#select-all').click(function() {
            var checked = this.checked;
            $('input[type="checkbox"]').each(function() {
                this.checked = checked;
            });
        })
    });

    $(".btn").on('click', function(e) {
        fileType = $(this).attr("value");

        var $form = $("#download_form").click("submit", function(e) {

            resetMessage();

            var zip = new JSZip();

            // find every checked item
            $(this).find(":checked").each(function() {
                var $this = $(this);

                function filePerPack(length) {
                    for (var i = 1; i < length; i++) {
                        var url = $this.data("url" + [i]);
                        var dataFolder = $this.data("folder" + [i]);
                        var folder = zip.folder(dataFolder);
                        var filename = url.replace(/.*\//g, "");
                        result = folder.file(filename, urlToPromise(url), {
                            binary: true
                        });
                    }
                    return result;
                }

                var amount = $this.data("amount");
                filePerPack(amount + 1);
            });


            //_master files here
            zip.file("readme.txt", "generated By PiSaucer \nan unofficial port of Minecraft Vanilla Tweaks for Bedrock. \nPlease read the LEGAL_DISCLAIMER.txt for more information\n");
            zip.file("LEGAL_DISCLAIMER.txt", "# Legal Disclaimer\n\nThis is the legal disclaimer and use authotization of Vanilla Tweaks Bedrock Edition.\n\nIn case Vanilla Tweaks releases the offical Bedrock Resource Packs, I would remove all the ones they have released on their site.\n\n\n# Vanilla Tweaks ─ Terms and Usage \n\nRegarding using Vanilla Tweaks in your own projects\n\nIt is perfectly fine for anyone to use, modify and share our packs within their projects for the betterment of the community.\nHowever, you may only do so if it does not infringe on the following terms and conditions:\n\n## Section 1 - Terms\n\n1.1. You cannot redistribute our tweaks as they are, without proper modification and/or additions.\n\n1.2. You cannot restrict access or sell any pack that includes our tweaks through donations and/or a paywall.\n\n1.3. You cannot distribute our tweaks without appropriate credit (refer to Section 2)\n\n1.4 You can distribute your pack with our tweaks, as long as your pack includes proper modification and/or additions.\n\n1.5. You can distribute your pack with our tweaks, as long as you have appropriately credited Vanilla Tweaks (refer to Section 2).\n\n1.6. You can distribute your pack with our tweaks, as long as it is free to use for the community.\n\n## Section 2 - Credits\n\n2.1. You must include the below text on all main publishing platforms that you may use. (Minecraft Forum, Planet Minecraft, Minecraft Maps, Curseforge, etc.).\n\n2.2 You must create a credits.txt within your project that includes the below text.\n\n```\nCredits:\nVanilla Tweaks: https://vanillatweaks.net/\n\n```\n\nAll picture assets belong to the Vanilla Tweaks Team.\n.mcpacks that are not ours are credited\nIf you have any issues please don't hesitate to contact me on GitHub.\n");

            zip.file("credits.txt", "# Credits\n\n## [Vanilla Tweaks Bedrock Edition](https://github.com/PiSaucer/VanillaTweaksBedrock)\n- PiSaucer - Web development\n\n## [BedrockVanillaTweaks Team](https://github.com/alt03b1/BedrockVanillaTweaks)\n- alt03b1\n- lithium-lx\n- KaanGaming\n- amybluesky - Lower Shield - [curseforge](https://www.curseforge.com/minecraft/mc-addons/lower-shield-by-amybluesky/files)\n- Offroaders123 - Dark Mode - [GitHub](https://github.com/Offroaders123/Dark-Mode)\n\n## [Vanilla Tweaks Team](https://vanillatweaks.net/)\n- André Paulo - Web development\n- Stridey - Pack development\n- Grant - Pack development\n- MSpaceDev – Pack development\n- Rick South – Web design\n- RockyAvalon – Pack development\n- tr33c – Pack development\n- Upperjeans – Pack development\n- Pollie – Pack development\n\n## Other Thanks\n- [JSZip Team](https://stuk.github.io/jszip/)\n- [FileSaver Team](https://github.com/eligrey/FileSaver.js/)\n- [jQuery Team](https://jquery.com/)\n- [Bootstrap Team](https://getbootstrap.com/)\n- [SortableJS Team](https://github.com/SortableJS/Sortable)\n\nCredits:\nVanilla Tweaks: https://vanillatweaks.net/\n");

            zip.file("LICENSE.txt", "MIT License\n\nCopyright (c) 2021 PiSaucer\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the Software ), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED AS IS , WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n");

            zip.file("pack_icon.png", pack_icon_b64, {
                base64: true
            });

            var uuid1 = uuidv4();
            var uuid2 = uuidv4();

            console.log("uuid1: " + uuid1 + "\nuuid2: " + uuid2);

            var manifestInfoOBJ = {
                "format_version": 2,
                "header": {
                    "description": "§evanillatweaksbedrock.ml",
                    "name": "§6Vanilla Tweaks Bedrock",
                    "uuid": uuid1,
                    "version": [0, 0, 1],
                    "min_engine_version": [1, 14, 0]
                },
                "modules": [{
                    "description": "§evanillatweaksbedrock.ml",
                    "type": "resources",
                    "uuid": uuid2,
                    "version": [1, 0, 0]
                }]
            };
            var manifestInfo = JSON.stringify(manifestInfoOBJ);

            zip.file("manifest.json", manifestInfo);

            // when everything has been downloaded, we can trigger the download
            zip.generateAsync({
                    type: "blob"
                }, function updateCallback(metadata) {
                    var msg = "progress: " + metadata.percent.toFixed(2) + "%";
                    if (metadata.currentFile) {
                        msg += " | adding: " + metadata.currentFile;
                    }
                    showMessage(msg);
                    updatePercent(metadata.percent | 0);
                })
                .then(function callback(blob) {

                        // see FileSaver.js

                        function makeid(length) {
                            var result = '';
                            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                            var charactersLength = characters.length;
                            for (var i = 0; i < length; i++) {
                                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                            }
                            return result;
                        }

                        var packID = makeid(5);

                        console.log("Filename: tweaks_" + packID + "." + fileType);

                        saveAs(blob, "tweaks_" + packID + "." + fileType);

                        showMessage("Thank you for downloading 😊");

                        $("#download_form").off();
                    },
                    function(e) {
                        showError(e);
                    });

            return false;
        });
    });

    /**
     * Reset the message.
     */
    function resetMessage() {
        $("#result")
            .removeClass()
            .text("");
    }
    /**
     * show a successful message.
     * @param {String} text the text to show.
     */
    function showMessage(text) {
        resetMessage();
        $("#result")
            .addClass("alert alert-success")
            .text(text);
    }
    /**
     * show an error message.
     * @param {String} text the text to show.
     */
    function showError(text) {
        resetMessage();
        $("#result")
            .addClass("alert alert-danger")
            .text(text);
    }
    /**
     * Update the progress bar.
     * @param {Integer} percent the current percent
     */
    function updatePercent(percent) {
        $("#progress_bar").removeClass("hide")
            .find(".progress-bar")
            .attr("aria-valuenow", percent)
            .css({
                width: percent + "%"
            });
    }

    if (!JSZip.support.blob) {
        showError("This works only with a modern browser !");
        return;
    }

});
