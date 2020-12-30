
const
    express = require("express")
    , application = express()
    , configuration = require('./configuration.json')
    , fetchUrl = require("fetch").fetchUrl
    , port = 4004
    , db = require('./apis/mongo')
    , ApplicationModel = db.ApplicationModel
    ;


const handleError = (err) => {
    console.error(err);
    return;
}

application.get('/', (req, res) => {
    res.send('Test');
})

const confirmPassword = (req, res) => {
    return true;
    if (req.query.password !== configuration.password) {
        res.send('Password denied!')
        return false;
    }
    return true;
}

application.get('*', (req, res, next) => {
    if (!confirmPassword(req, res)) {
        return;
    }
    next();
})

// GET for testing purposes only
// TODO Make into a post request
application.get('/pullApplications', async (req, res) => {

    console.time("pullApplications")

    await fetchUrl('https://api.steampowered.com/ISteamApps/GetAppList/v2/', async function (err, meta, body) {
        let allApps = JSON.parse(body).applist.apps;

        res.send('Currently pulling all applications - will redirect upon completion')

        var i = 0, n = 0;
        for (let app of allApps) {
            if (app.name === undefined || app.name === null || app.name == "" || app.appid === undefined || app.appid === null || app.appid == "") {
                continue;
            }
            n++;
            await new ApplicationModel({
                title: app.name,
                vendor_id: app.appid
            }).save()
                .catch(err => {
                    i++;
                    if (err.code == 11000) {
                        return;
                    } else {
                        console.log(err);
                    }
                })
            //console.log(game);
        }

        console.log("Done!");
        console.log(`Handled ${n} items of which ${i} were skipped due to errors/duplication adding a total of ${n - i} new items`)
        console.timeEnd("pullApplications")

    });
})

// TODO Make into a post request
application.get('/pullPricing', async (req, res) => {
    await ApplicationModel.findOne().sort({ vendor_id: -1 }).limit(1).exec(async (err, app) => {
        // Using this I can calculate how long the url can be at most before "crashing"
        let baseUrl = `https://store.steampowered.com/api/appdetails?format=json&filters=price_overview&appids=`; // format=json to avoid Russian in some games & filter=price_overview to get pricing
        let maxUrlLength = 2000; // With a little extra space, in case of trouble
        let lengthRemaining = Number(maxUrlLength - baseUrl.length);

        if (err) return handleError(err);
        let maxAmountOfGames = Math.floor(lengthRemaining / (String(app.vendor_id) + 1).length);

        console.log(`I'm gonna get the price!`);
        console.time("pullPricing")
        //for (var i = 0; i < 1; i++) {
        for (var i = 0; i < maxAmountOfGames; i++) {
            await ApplicationModel.find({ free: false }).sort({ _id: -1 }).skip(maxAmountOfGames * i).limit(maxAmountOfGames).select('vendor_id').exec(async (err, apps) => {
                var finalUrl = baseUrl;
                if (err) return handleError(err);

                for (let app of apps) {
                    finalUrl += `${app.vendor_id},`;
                }


                await fetchUrl(finalUrl, async function (err, meta, body) {
                    let appsPricing = JSON.parse(body);

                    //console.log(appsPricing);
                    //console.log(typeof appsPricing);

                    for (let appID in appsPricing) {
                        app = appsPricing[appID];
                        //console.log(app);

                        // App is likely a tool or alike - ignore for now
                        // TODO Find a way to check tool app ids
                        if (app.success === undefined || app.success === null || app.success == "" || app.success == false) {

                            continue;
                        }
                        // App is likely free to play then
                        // TODO Run app instantly manually to ensure that it's free to play
                        if (app.data === undefined || app.data.length === 0 || app.data.price_overview === undefined) {

                            continue;
                        } else {
                            await ApplicationModel.findOne({ vendor_id: appID }, (err, dbApp) => {
                                if (err) handleError(err);
                                dbApp.price = {};
                                dbApp.price[app.data.price_overview.currency] = {};
                                dbApp.price[app.data.price_overview.currency] = {
                                    currency: app.data.price_overview.currency,
                                    initial: app.data.price_overview.initial,
                                    initial_formatted: app.data.price_overview.initial_formatted,
                                    final: app.data.price_overview.final,
                                    final_formatted: app.data.price_overview.final_formatted,
                                    percentage: app.data.price_overview.discount_percentage
                                }
                                dbApp.save();
                            });

                        }



                        /* .updateOne({
                            price: {
                                currency: app.data.price_overview.currency,
                                initial: app.data.price_overview.initial,
                                initial_formatted: app.data.price_overview.initial_formatted,
                                final: app.data.price_overview.final,
                                final_formatted: app.data.price_overview.final_formatted,
                                percentage: app.data.price_overview.discount_percentage
                            }
                        }).exec((err, update) => {
                            if (err) handleError(err);
                            console.log(update);
                        }) */

                        /* await ApplicationModel.updateOne({ vendor_id: appID }, {
                            price: {
                                currency: app.data.price_overview.currency,
                                initial: app.data.price_overview.initial,
                                initial_formatted: app.data.price_overview.initial_formatted,
                                final: app.data.price_overview.final,
                                final_formatted: app.data.price_overview.final_formatted,
                                percentage: app.data.price_overview.discount_percentage
                            }
                        }) */

                        //console.log(appID);
                    }

                    console.log("Done!");
                })
            })
        }
        console.timeEnd("pullPricing")
    })
    res.send('Pricing')
})

// TODO Make into a post request
application.get('/pullPricingDeep', (req, res) => {

    if (req.query.sure != "YES" && req.query.absolutelySure != "yes") {
        return;
    }

    let baseUrl = `https://store.steampowered.com/api/appdetails?format=json&appids=`; // format=json to avoid Russian in some games




    res.send('Currently pulling pricing - this will take a very long time')
});



application.listen(port, () => {
    console.log(`App is ready at http://localhost:${port}`);
});