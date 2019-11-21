import { HtmlElement, Route } from 'cx/widgets';


import Sales from './sales';
import CountryInfo from './country-informations';
import WebAnalytics from './web-analytics';

export default <cx>
    <Route route="~/dashboards/sales" url:bind="url">
        <Sales />
    </Route>
    <Route route="~/dashboards/country-informations" url:bind="url">
        <CountryInfo />
    </Route>
    <Route route="~/dashboards/web-analytics" url:bind="url">
        <WebAnalytics />
    </Route>
</cx>;
