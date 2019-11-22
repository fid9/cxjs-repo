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
                vlines
                value-bind="$page.clicked"
                text-bind="$page.text"
                options-bind="$page.options"
                autoFocus
                selection={{ type: KeySelection, bind: '$page.clicked' }}/>
                
        </div>
        
        <Window
            title = "REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"
            visible={{ bind: "$page.contact.visible", defaultValue: false }}
            center
            style={{ width: "400px" }}
            modal
          >
            <div
              style={{ padding: "20px" }}
              layout={{ type: LabelsLeftLayout, mod: "stretch" }}
            >
              <Text tpl='Country name: {$page.country|Not Found!}' />
              <Text tpl='Capital: {$page.capital|Not Found!}' />
              <Text tpl='Continent: {$page.continent|Not Found!}' />
              <Text tpl='Population: {$page.population|Not Found!}' />
              <Text tpl='Languages: {$page.languages|Not Found!}' />
            </div>
      </Window>
      
      <div> 
            <Grid records-bind='$page.records'
                onRowClick={(e, { store }) => {
                      const result = store.get('$page.records').filter(rec => {
                        if(rec.id === store.get('$page.selection')) return rec;
                      })
                    store.set('$page.country', result["0"].countryName)
                    store.set('$page.capital', result["0"].capital)
                    store.set('$page.continent', result["0"].continent)
                    store.set('$page.population', result["0"].population)
                    store.set('$page.languages', result["0"].languages)

                    store.set("$page.contact.visible", true);
                    }}
                    mod="orders"
                    class="flex1"
                    scrollable
                    lockColumnWidths
                    vlines
                    sortable
                    resizable = {"true"}
                    border={false}      
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