document.addEventListener("DOMContentLoaded", function() {
    const inputBox = document.querySelector(".input_box");
    let currentValue = "";

    document.querySelectorAll("section[class^='btn_']").forEach(button => {
        button.addEventListener("click", function() {
            const btnValue = this.innerText;

            if (btnValue === "AC") {
                currentValue = "";
            } else if (btnValue === "C") {
                currentValue = currentValue.slice(0, -1);
            } else if (btnValue === "=") {
                try {
                    currentValue = eval(currentValue);
                } catch (error) {
                    currentValue = "Error";
                }
            } else {
                currentValue += btnValue;
            }

            inputBox.value = currentValue;
        });
    });

    inputBox.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            try {
                currentValue = eval(inputBox.value);
            } catch (error) {
                currentValue = "Error";
            }
            inputBox.value = currentValue;
        } else if (e.key === "Escape") {
            currentValue = "";
            inputBox.value = "";
        } else if (["%", "/", "*", "-", "+"].includes(e.key)) {
            e.preventDefault();
            currentValue += e.key;
            inputBox.value = currentValue;
        } else if (e.key === "Delete") {
            currentValue = currentValue.slice(0, -1);
            inputBox.value = currentValue;
        }
    });

    inputBox.addEventListener("input", function() {
        currentValue = this.value;
    });

    inputBox.addEventListener("focus", function() {
        if (this.value === "0" || this.value === "Error") {
            this.value = "";
            currentValue = "";
        }
    });

    inputBox.addEventListener("blur", function() {
        if (this.value === "") {
            this.value = "0";
            currentValue = "";
        }
    });
});
