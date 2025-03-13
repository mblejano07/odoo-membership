/** @odoo-module **/
import { Component, xml, mount, whenReady, useState, onWillStart } from "@odoo/owl";

class SignupRegionComponent extends Component {
    setup() {
        this.state = useState({ regions: [] });

        // JSON-RPC call to fetch regions
        onWillStart(async () => {
            try {
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
                            model: "psgc.region",
                            method: "search_read",
                            args: [],
                            kwargs: {
                                fields: ["id", "name"]
                            }
                        },
                        id: new Date().getTime()
                    }),
                });

                const result = await response.json();
                console.log("JSON-RPC Response:", result);
                this.state.regions = result.result || [];
            } catch (error) {
                console.error("RPC Error:", error);
            }
        });
    }
}

SignupRegionComponent.template = xml`
<div class="p-4 border">
    <h3>Region</h3>
    <ul>
        <t t-foreach="state.regions" t-as="region" t-key="region.id">
            <li><t t-esc="region.name"/></li>
        </t>
    </ul>
</div>`;

// Mount the component
whenReady(() => {
    const element = document.querySelector('#region_component');
    if (element) {
        mount(SignupRegionComponent, element);
    }
});
