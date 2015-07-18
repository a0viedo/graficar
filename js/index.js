function init(list) {
    var diameter = 960,
        format = d3.format(",d"),
        color = d3.scale.category20c();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select("body").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    var root = {
        children: list
    };

    var node = svg.selectAll(".node")
        .data(bubble.nodes(root)
            .filter(function(d) {
                return !d.children;
            }))
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function(d) {
            return d.name + ": " + format(d.value);
        });

    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill", function(d) {
            return color(Math.random());
        });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.name.substring(0, d.r / 3);
        });


    d3.select(self.frameElement).style("height", diameter + "px");
}


$(document).ready(function() {
    $('#loadData').on('click', function() {
        // hacer un GET a /nodeschool
        $.get('/nodeschool', function(data){
            init(data);
        }).fail(function(err){
            console.log(err);
        });
    });

    $('#saveData').on('click', function() {
        // hacer un POST a /nodeschool
        $.post('/nodeschool', $('#inputData').val(), 'json');
    });
})