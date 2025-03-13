/** @odoo-module **/
import { Component, xml, mount, whenReady, useState, onWillStart } from "@odoo/owl";

class SignupRegionComponent extends Component {
    setup() {
        this.state = useState({
            regions: [],
            provinces: [],
            cities: [],
            barangays: [],
            selectedRegion: null,
            selectedProvince: null,
            selectedCity: null,
        });

        // Fetch Regions on Page Load
        onWillStart(async () => {
            this.state.regions = await this.fetchData("psgc.region");
        });
    }

    async fetchData(model, domain = []) {
        const response = await fetch("/web/dataset/call_kw", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "call",
                params: {
                    model: model,
                    method: "search_read",
                    args: [domain],
                    kwargs: {
                        fields: ["id", "name"]
                    }
                },
                id: new Date().getTime()
            }),
        });

        const result = await response.json();
        return result.result || [];
    }

    async handleRegionChange(event) {
        const regionId = parseInt(event.target.value);
        this.state.selectedRegion = regionId;
        this.state.provinces = await this.fetchData("psgc.province", [['region_id', '=', regionId]]);
        this.state.cities = [];
        this.state.barangays = [];
    }

    async handleProvinceChange(event) {
        const provinceId = parseInt(event.target.value);
        this.state.selectedProvince = provinceId;
        this.state.cities = await this.fetchData("psgc.city", [['province_id', '=', provinceId]]);
        this.state.barangays = [];
    }

    async handleCityChange(event) {
        const cityId = parseInt(event.target.value);
        this.state.selectedCity = cityId;
        this.state.barangays = await this.fetchData("psgc.barangay", [['city_id', '=', cityId]]);
    }
}

SignupRegionComponent.template = xml`
<div>
    <div class="mb-3 field-region pt-2">
        <label for="region_id">Region</label>
        <select name="region_id"  id="region_id" class="form-control form-control-sm" t-on-change="handleRegionChange" t-att-value="state.selectedRegion">
            <option value="" t-att-disabled="true" t-att-selected="true">Select Region</option>
            <t t-foreach="state.regions" t-as="region" t-key="region.id">
                <option t-att-value="region.id" t-att-selected="state.selectedRegion === region.id"><t t-esc="region.name" /></option>
            </t>
        </select>
    </div>

    <div class="mb-3 field-province pt-2">
        <label for="province_id">Province</label>
        <select name="province_id"  id="province_id" class="form-control form-control-sm" t-on-change="handleProvinceChange" t-att-value="state.selectedProvince">
            <option value="" t-att-disabled="true" t-att-selected="true">Select Province</option>
            <t t-foreach="state.provinces" t-as="province" t-key="province.id">
                <option t-att-value="province.id" t-att-selected="state.selectedProvince === province.id"><t t-esc="province.name" /></option>
            </t>
        </select>
    </div>

    <div class="mb-3 field-city pt-2">
        <label for="city_id">City</label>
        <select name="city_id" id="city_id" class="form-control form-control-sm" t-on-change="handleCityChange" t-att-value="state.selectedCity">
            <option value="" t-att-disabled="true" t-att-selected="true">Select City</option>
            <t t-foreach="state.cities" t-as="city" t-key="city.id">
                <option t-att-value="city.id" t-att-selected="state.selectedCity === city.id"><t t-esc="city.name" /></option>
            </t>
        </select>
    </div>

    <div class="mb-3 field-barangay pt-2">
        <label for="barangay_id">Barangay</label>
        <select name="barangay_id" id="barangay_id" class="form-control form-control-sm">
            <option value="" t-att-disabled="true" t-att-selected="true">Select Barangay</option>
            <t t-foreach="state.barangays" t-as="barangay" t-key="barangay.id">
                <option t-att-value="barangay.id"><t t-esc="barangay.name" /></option>
            </t>
        </select>
    </div>
</div>`;

// Mount the component
whenReady(() => {
    const element = document.querySelector('#region_component');
    if (element) {
        const component = mount(SignupRegionComponent, element);

        // Set up a MutationObserver to watch for the dynamic fields being added
        const form = document.querySelector('.oe_signup_form');

        const serializedData = $(form).serializeArray();
        console.log(serializedData);  // Handle serialized data here

    }
});
