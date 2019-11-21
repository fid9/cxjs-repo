import { Controller, History, Url } from 'cx/ui';
var Geonames = require("geonames.js");

const geonames = new Geonames({
    username: 'Arlind',
    lan: 'en',
    encoding: 'JSON'
});



export default class extends Controller {

    
    init() {
        super.init();
        geonames.search({ q: 'CONT' }) //get continents
            .then(resp => {
                let continents = resp.geonames;
                this.store.set('$page.options', continents.map((item,i) => ({ text: item.name, id: i })));
                
            })
            .catch(err => console.error(err));

        // geonames.countryInfo() //get all countries
        //     .then(resp => {
        //         let countries = resp.geonames;
        //         this.store.set('$page.records', countries.map(item => ({
        //             countryName: item.countryName,
        //             capital: item.capital,
        //             continent: item.continentName,
        //             population: item.population,
        //             languages: item.languages
        //         })));
        //     })
        //     .catch(err => console.error(err)); 
            
            this.addTrigger('t1', ['$page.text'], cont => {
                geonames.countryInfo() //get countries of a given continent
                .then(resp => {
                    let countries = resp.geonames;
                    this.store.set('$page.records', countries.map((item, i)=> ({
                        id: i+1,
                        countryName: item.countryName,
                        capital: item.capital,
                        continent: item.continentName,
                        population: item.population,
                        languages: item.languages
                    })).filter(item => item.continent === cont));

                })
                .catch(err => console.error(err));
            });

              this.addTrigger('t2', ['$page.selection'], () => {
  
                 for (let i = 0; i < this.store.get('$page.records').length; i++) {
                     if (Object.values(this.store.get('$page.records')[i]).indexOf(this.store.get('$page.selection')) > -1) {
                         let countryName = 'Country: ' + this.store.get('$page.records')[i]['countryName'];
                          this.store.set("$page.country", countryName);
                          let capital = 'Capital: ' + this.store.get('$page.records')[i]['capital'];
                          this.store.set("$page.capital", capital);
                          let continent = 'Continent: ' + this.store.get('$page.records')[i]['continent'];
                          this.store.set("$page.continent", continent);
                          let population = 'Population: ' + this.store.get('$page.records')[i]['population'];
                          this.store.set("$page.population", population);
                          let languages = 'Languages: ' + this.store.get('$page.records')[i]['languages'];
                          this.store.set("$page.languages", languages);
                         break;
                     }
                 }
     
                  this.store.set("$page.visible", true);
              });

           

            
    }
    
}
