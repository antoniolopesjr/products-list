import Route from "@ember/routing/route";
//import fetch from "fetch";
import $ from "jquery";

export default class IndexRoute extends Route {
  model() {
    return $.ajax({
      url: `https://yd3szwgkse.execute-api.us-east-1.amazonaws.com/v1/products`,
      type: "GET",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
    }).then((res) => {
      const productItems = res.Items;
      return productItems.map((model) => {
        let results = model;

        let _price = results.price.toFixed(2);

        function formatNumber(num) {
          return num.replace(".", ",");
        }

        let productPrice = _price.replace(".", ",");

        return {
          productPrice,
          ...results,
        };
      });
    });
  }
}
