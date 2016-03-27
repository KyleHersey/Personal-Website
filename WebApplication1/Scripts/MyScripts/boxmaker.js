document.onload = setupSandbox();

    function setupSandbox() {
        var sandbox = document.getElementById("sandbox");
        sandbox.className = "col-lg-12";
        sandbox.style.height = window.innerHeight - 20 + "px";
    }

    function makeBox() {
        while (document.getElementById("sandbox").childElementCount > 0) {
            document.getElementById("sandbox").removeChild(document.getElementById("sandbox").childNodes[0]);
        }


        setupSandbox();
        for (var i = 0; i < document.getElementById("numBoxes").value; i++) {
            var box = document.createElement("div");
            box.className = "box";
            box.style.marginRight = "1px";
            box.style.width = "3px";
            box.style.height = Math.floor(Math.random() * 200) + 1 + "px";
            box.style.backgroundColor = "Blue";
            box.style.float = "left";
            document.getElementById("sandbox").appendChild(box);
        }
    }

    function makebox(height) {
        var box = document.createElement("div");
        box.className = "box";
        box.style.marginRight = "1px";
        box.style.width = "3px";
        box.style.height = height + "px";
        box.style.backgroundColor = "Blue";
        box.style.float = "left";
        document.getElementById("sandbox").appendChild(box);
    }