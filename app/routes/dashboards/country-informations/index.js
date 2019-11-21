import { HtmlElement, Text, Link, TextField, TextArea, Button, Checkbox, DateField, Overlay, Window } from 'cx/widgets';
import { LookupField } from 'cx/widgets';
import { LabelsLeftLayout, KeySelection } from 'cx/ui';
import { Grid } from 'cx/widgets';


import Controller from './Controller';

export default <cx>
    <main controller={Controller}>
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item"><Link href="~/">Home</Link></li>
                <li class="cse-breadcrumb-item">Dashboard</li>
                <li class="cse-breadcrumb-item">Country Informations</li>
            </ul>
            <LookupField
                label="Select the continent: "
                // records-bind="$page.continents"
                value-bind="$page.clicked"
                text-bind="$page.text"
                options-bind="$page.options"
                autoFocus
                selection={{ type: KeySelection, bind: '$page.clicked' }}/>
                
        </div>
        
        <Window
            visible={{ bind: "$page.contact.visible", defaultValue: false }}
            center
            style={{ width: "500px" }}
            modal
          >
            <div
              style={{ padding: "20px" }}
              layout={{ type: LabelsLeftLayout, mod: "stretch" }}
            >
              <Text tpl='{$page.country|guest}' />
              <Text tpl='{$page.capital|guest}' />
              <Text tpl='{$page.continent|guest}' />
              <Text tpl='{$page.population|guest}' />
              <Text tpl='{$page.languages|guest}' />
            </div>
      </Window>
      
      <div> 
            <Grid records-bind='$page.records'
                onRowClick={(e, { store }) => {
                    // store.get('$page.records').filter(
                    //   i=>{
                    //     if(Object.values(store.get('$page.records')[i]).indexOf(store.get('$page.selection')) > -1){
                    //       let countryName = 'Country: ' + this.store.get('$page.records')[i]['countryName'];
                    //       this.store.set("$page.country", countryName);
                    //       let capital = 'Capital: ' + this.store.get('$page.records')[i]['capital'];
                    //       this.store.set("$page.capital", capital);
                    //       let continent = 'Continent: ' + this.store.get('$page.records')[i]['continent'];
                    //       this.store.set("$page.continent", continent);
                    //       let population = 'Population: ' + this.store.get('$page.records')[i]['population'];
                    //       this.store.set("$page.population", population);
                    //       let languages = 'Languages: ' + this.store.get('$page.records')[i]['languages'];
                    //       this.store.set("$page.languages", languages);
                    //     }
                    //   }
                    // )
                    //console.log(store.get('$page.selection'));
                    //console.log(store.get('$page.selection'));
                    store.set("$page.contact.visible", true);
                    }}
                    mod="orders"
                    class="flex1"
                    scrollable
                    sortable
                    border={false}  
                    lockColumnWidths     
                    columns={[
                    { header: 'Country Name', field: 'countryName', sortable: true, aggregate: 'count', footer: { tpl: '{$group.fullName} {$group.fullName:plural;person}' } },
                    { header: 'Capital', field: 'capital', sortable: true, aggregate: 'distinct', aggregateField: 'continents', footer: { tpl: '{$group.continents} {$group.continents:plural;continent}' } },
                    { header: 'Continent', field: 'continent', sortable: true, aggregate: 'distinct', aggregateField: 'browsers', footer: { tpl: '{$group.browsers} {$group.browsers:plural;browser}' } },
                    { header: 'Population', field: 'population', sortable: true, aggregate: 'distinct', aggregateField: 'oss', footer: { tpl: '{$group.oss} {$group.oss:plural;OS}' } },
                    { header: 'Languages', field: 'languages', sortable: true, aggregate: "sum" }
                ]}
               selection={{ type: KeySelection, bind: '$page.selection' }}
        />
        </div>
    </main>
</cx>