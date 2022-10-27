function buildMetadata(sample){
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

// //Filter the data for the objet with the desired sample number
let metadata = data.metadata;
let arrayResults = metadata.filter(sampleobject => sampleobject.id == sample);
let result = arrayResults [0]

// //Use d3 to select the panel with id of '#sample-metadata'
// //use '.htlm("") to clear any existing metadata

let div = d3.select("sample-metadata");
div.html("")
Object.entries(result).forEach(([key, value]) => {
    div.append("li").text(`${key} : ${value}`);

});



});
}
// //Hint: Inside the loop you will need to use d3 to append new
// // tags for each key-value in the metadata.


// //BONUS: Build the Gauge Chart- only do this if you have time


// }


//  //put the data into a variable- this variable is from the top
//  //filter the data using 'sample'
//  //grab the first entry [0] - might need this (this is the result variable from below)
function buildCharts(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {



let samples = data.samples;
let arrayResults = samples.filter(sampleobject => sampleobject.id == sample);
let result = arrayResults[0]

let otu_ids = result.otu_ids;
let otu_labels = result.otu_labels;
let sample_values = result.sample_values;


//  //REMEMBER for the the bubble these are the items
//  //otu_ids = x and color
//  //sample_values = y and size
//  //otu_labels is the .text


// //Build a Bubble Chart. 
// // https://plotly.com/javascript/bubble-charts/

var LayoutBubble = {
    margin: { t: 0 },
    xaxis: { title: "OTU ID" },
    hovermode: "closest",
    };

    var DataBubble = [ 
    {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        color: otu_ids,
        size: sample_values,
        }
    }
  ];

  Plotly.newPlot("bubble", DataBubble, LayoutBubble);

  let yticks = otu_ids.slice(1,10).map(otuID => `OTO ${otuID}`).reverse();

  var barData =[
    {
    y: yticks,
    x:sample_values.slice(0,10).reverse(),
    text:otu_labels.slice(0,10).reverse(),
    type:"bar",
    orientation:"h"

    }
  ];

  var barLayout = {
    title: "Top 10 Bacteria Cultures Found",
    margin: { t: 30, l: 150 }
  };

  Plotly.newPlot("bar", barData, barLayout);
});
}
 

function init() {

// // use d3 to selec the dropdown element ($selDataSet)

let select = d3.select("selDataset");


d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      select
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  
    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
  }
  
  newSample = d3.select("optionChanged");
  function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  }
  
init();

  
  // Initialize the dashboard

// // slice the data down to 10 items
// //you will probably want to reverse them to get them into desc order


// //create trace, trace will have an x, y and  size 

// //create layout (title is enough)

//     });
// }

// function init(){


// // Use the list of sample names to populate the select options

//       //loop throught the same data (from the variable) sampel names
//       //append option to the drop-down

//       //use the first sample from the lust to build the intial plots
//       // run build charts
//       //run build MetaData
// }

// function optionChanged(newSample){
//     //fetch new data each time a row sample is selected
//     // run build charts
//     //run build MetaData
// }
