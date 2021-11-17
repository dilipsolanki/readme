<x-app-layout>
    @livewire('lumiere-new.header')
    @push('scripts')
    <script>

        window.addEventListener('show-lum-searching', event => {
            document.getElementById('searchStringForL').innerText = event.detail.inputQueryString;
            updateWordCounter(event);
            document.getElementById('searchStringForL').blur();
            showLoading();    
        });

        window.addEventListener('oops-error', oopsError);
        window.addEventListener('reset-entered-string', event => {
            document.getElementById('searchStringForL').innerText = event.detail.inputQueryString;
        });

        function showLoading() {
            var animation = bodymovin.loadAnimation({
                // animationData: { /* ... */ },
                container: document.getElementById('loadingContainer'), // required
                path: 'icons/lumiere-searching.json', // required
                renderer: 'svg', // required
                loop: true, // optional
                autoplay: true, // optional
                name: "Demo Animation", // optional
            });
        }

        function oopsError() {
            var animation = bodymovin.loadAnimation({
                // animationData: { /* ... */ },
                container: document.getElementById('errorLottie'), // required
                path: 'icons/lumiere-error.json', // required
                renderer: 'svg', // required
                loop: true, // optional
                autoplay: true, // optional
                name: "Demo Animation", // optional
            });
        }

        function updateWordCounter(evt) {
            var inputStringByUser = document.getElementById('searchStringForL').innerText;
            document.getElementById('charatersEntered').innerText = inputStringByUser.trim().split(" ").join("").split("").length;
            if (evt.which === 8 || evt.which === 46) {
                return true;
            } else if (inputStringByUser.trim().split(" ").join("").split("").length >= 40) {
                evt.preventDefault();
                return false;
            }
        }

        function validateInput(evt, wireIsHere) {
            wireIsHere.call('resetAll', evt.target.innerText);
            // wireIsHere.set('synonmysOutput', new Array);
            // wireIsHere.set('compareResults', new Array);
            // wireIsHere.set('totalOccurences', 0);
            
            
            if(evt.which == 13) {
                evt.preventDefault();
                // return false;
            }
            
            // var searchContainerNode = document.getElementById('searchStringForL');
            // var enteredUserString = document.getElementById('searchStringForL').innerText;
            // // console.log(enteredUserString);
            // // console.log(enteredUserString.replace(/(\r\n|\n|\r)/gm, " "))
            // // console.log(convertToText(enteredUserString));
            // var inputStringByUser = enteredUserString.split(" ");
            // document.getElementById('searchStringForL').innerText = enteredUserString.replace(/(\r\n|\n|\r)/gm, "");
            // searchContainerNode.removeChild(searchContainerNode.childNodes[0]);
            
            const counts = {};
            var errorMessageContainer = document.getElementById('errorMessageContainer');
            
            var inputStringByUser = evt.target.innerText.split(' ');
            inputStringByUser.forEach(function (x) {
                if(x.toLowerCase() == 'vs' || x == '*') {
                    counts[x] = (counts[x] || 0) + 1; 
                }
            });
            document.getElementById('searchStringForL').blur();
            
            if(evt.target.innerText.trim().length < 4) {
                errorMessageContainer.style.display = 'block';
                wireIsHere.set('errorMessage', 'Please enter a minimum of 4 characters.');
                errorMessageContainer.innerText = 'Please enter a minimum of 4 characters.';
                return false;
            } else if(inputStringByUser.includes('*') && inputStringByUser.includes('vs')) {
                errorMessageContainer.style.display = 'block';
                wireIsHere.set('errorMessage', 'Only one operator is allowed. You cannot use * and VS.');
                errorMessageContainer.innerText = 'Only one operator is allowed. You cannot use * and VS.';
                return false;
            } else if (counts['vs'] > 1 || counts['*'] > 1) {
                errorMessageContainer.style.display = 'block';
                wireIsHere.set('errorMessage', 'You cannot have same operator used more than once.');
                errorMessageContainer.innerText = 'You cannot have same operator used more than once.';
                return false;
            } else if (evt.target.innerText.trim().split(" ").join("").split("").length >= 40) {
                errorMessageContainer.style.display = 'block';
                wireIsHere.set('errorMessage', 'You cannot have more than 40 words.');
                errorMessageContainer.innerText = 'You cannot have more than 40 words.';
                return false;
            } else {
                wireIsHere.set('errorMessage', '');
                errorMessageContainer.style.display = 'hidden';
            }

            return true;
        }


        // function convertToText(str) {
        //     // Ensure string.
        //     let value = String(str);

        //     // Convert encoding.
        //     value = value.replace(/&nbsp;/gi, ' ');
        //     value = value.replace(/&amp;/gi, '&');

        //     // Replace `<br>`.
        //     value = value.replace(/<br>/gi, '\n');

        //     // Replace `<div>` (from Chrome).
        //     value = value.replace(/<div>/gi, '\n');

        //     // Replace `<p>` (from IE).
        //     value = value.replace(/<p>/gi, '\n');

        //     // Remove extra tags.
        //     value = value.replace(/<(.*?)>/g, '');

        //     // Trim each line.
        //     value = value
        //         .split('\n')
        //         .map((line = '') => {
        //         return line.trim();
        //         })
        //         .join('\n');

        //     // No more than 2x newline, per "paragraph".
        //     value = value.replace(/\n\n+/g, '\n\n');

        //     // Clean up spaces.
        //     value = value.replace(/[ ]+/g, ' ');
        //     value = value.trim();

        //     // Expose string.
        //     return value;
        // };
    </script>
    @endpush
</x-app-layout>