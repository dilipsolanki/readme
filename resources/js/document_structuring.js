$(document).ready(function () {
    console.log("hello")
    $('input[type="file"]').change(function (e) {
        var fileName = e.target.files[0].name;
        $('#displayFileName').text(fileName);
    });
    $('#fileUploadButton').on('click', function (e) {
        e.preventDefault();
        if($('input[type=file]')[0].files.length !== 0)
        {
            var formData = new FormData($('#fileUploadForm')[0]);
            formData.append('document', $('input[type=file]')[0].files[0]);
            $('#loaderView').css('display', '');
            $.ajax({
                type: 'POST',
                url: window.documentStructuringUrl,
                data: formData,
                success: function (data) {
                    if (data.status == 'success') {
                        window.documentId = data.id;
                        timeoutInSeconds = 10000;
                        function checkIfProcessingCOmpleted(timeout) {
                            $('#loaderView').css('display', '');
                            setTimeout(function () {
                                $.ajax({
                                    url: '/check-if-processing-completed/' + data.id,
                                    type: 'GET',
                                    success: function (res) {
                                        $('#loaderView').css('display', 'none');
                                        if (res.status == 'success') {
                                            $('#resultTable').html('');
                                            $('#resultTable').html(res.data);
                                        } else {
                                            checkIfProcessingCOmpleted(5000);
                                        }
                                    }
                                })
                            }, timeout);
                        }

                        checkIfProcessingCOmpleted(timeoutInSeconds);
                    }
                    $('#loaderView').css('display', '');
                },
                processData: false,
                contentType: false
            });
        }

    });
});
