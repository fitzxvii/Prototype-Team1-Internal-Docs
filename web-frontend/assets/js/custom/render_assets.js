let assets_data = [
    /* CSS Global */
    {url: "/web-frontend/assets/css/vendor/bootstrap/bootstrap.min.css", type: "style"},
    {url: "/web-frontend/assets/css/custom/global.css", type: "style"},

    /* JS Global */
    {url: "/web-frontend/assets/js/vendor/bootstrap/bootstrap.bundle.min.js", type: "script"},
    {url: "/web-frontend/assets/js/vendor/csi.min.js", type: "script"},
    {url: "/web-frontend/assets/js/custom/global.js", type: "script"},

    /* CUSTOM JS */
    {url: current_js, type: "script"}
];

/* Call back to check if the assets is loaded. */
let callback = () => {
    console.log("Loaded!");
};

/* load the vendor for asset loader. */
let loader = new asyncAssetsLoader();

loader.load(assets_data, callback);