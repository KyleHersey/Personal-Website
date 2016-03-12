document.onload = setupSandbox();

    function setupSandbox() {
        var sandbox = document.getElementById("sandbox");
        sandbox.className = "col-lg-12";
        sandbox.style.height = window.innerHeight - 20 + "px";
    }

    function makeBox() {
        for (var i = 0; i < 100; i++) {
            var box = document.createElement("div");
            box.className = "box";
            box.style.marginRight = "1px";
            box.style.width = "1px";
            box.style.height = Math.floor(Math.random() * 200) + 1 + "px";
            box.style.backgroundColor = "Blue";
            box.style.float = "left";
            document.getElementById("sandbox").appendChild(box);
        }
    }

    function sortBoxes(){
        var children = document.getElementById("sandbox").children;
        var boxes = [];
        for (var i = 0; i < children.length; i++){
            if (children[i].className = "box") {
                boxes.push(children[i]);
            }
        }

        var sorted = false;
        var intervalDuration = 1;
        var loopCount = boxes.length;
        var outerCount = 0;
        var innerCount = 0;
        var innerIntervalID = 0;
        
        outerLoop();
        var outerInteravalID = setInterval(outerLoop, intervalDuration*boxes.length + 1);

        function outerLoop() {
            if (sorted) {
                clearInterval(outerInteravalID);
            } else {
                sorted = true;
                innerCount = 0;
                innerLoop();
                innerIntervalID = setInterval(innerLoop, intervalDuration);
            }
        }

        function innerLoop() {
            
            console.log(innerCount + "inner");

            if (innerCount >= loopCount - 1) {
                clearInterval(innerIntervalID);
            } else {
                boxes[innerCount].style.backgroundColor = "Yellow";

                var box1Height = parseInt(boxes[innerCount].style.height, 10);
                var box2Height = parseInt(boxes[innerCount + 1].style.height, 10);

                if (box1Height < box2Height) {
                    sorted = false;
                    console.log("swapped");
                    boxes[innerCount].style.backgroundColor = "Green";
                    boxes[innerCount + 1].style.backgroundColor = "Red";

                    //BELOW TO BE SWAPDIVS METHOD
                    //switch locations visibly
                    var tempStyle = boxes[innerCount].style.height;
                    boxes[innerCount].style.height = boxes[innerCount + 1].style.height;
                    boxes[innerCount + 1].style.height = tempStyle;
                }

                boxes[innerCount].style.backgroundColor = "Blue";
                boxes[innerCount + 1].style.backgroundColor = "Blue";
                innerCount++;
            }
        }
    }
