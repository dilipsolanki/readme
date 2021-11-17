<html>

<head>
    <!-- Styles -->
    <link
        rel="stylesheet"
        href="{{ mix('css/app.css') }}"
    >
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.6.4/lottie_svg.min.js"></script>
    <style>
        .newClass {
            cursor: pointer;
        }
    </style>
</head>

<body>
    <div
        class=""
        id="container"
    >
    </div>
    <script>
        var animation = bodymovin.loadAnimation({
            // animationData: { /* ... */ },
            container: document.getElementById('container'), // required
            path: 'icons/404-page-not-found.json', // required
            renderer: 'svg', // required
            loop: true, // optional
            autoplay: true, // optional
            rendererSettings: {
                preserveAspectRatio: 'none'
            }
        });

        setInterval(() => {
            document.querySelector('.newClass').onclick = function () {
                var baseUrl = "{{ json_encode(url('/')) }}";
                window.location.href = baseUrl.replace(/&quot;/g, '');
            };
        }, 500);

    </script>
</body>

</html>