$(document).ready(function () {
    var apiKey = 'YOUR_OPENAI_API_KEY';
    var apiUrl = 'https://api.openai.com/v1/';

    // Chat API
    $('#chat-btn').click(function () {
        var messages = [
            {'role': 'system', 'content': 'You are a helpful assistant.'},
            {'role': 'user', 'content': $('#chat-input').val()}
        ];

        $.ajax({
            url: apiUrl + 'chat/completions',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);
            },
            contentType: 'application/json',
            data: JSON.stringify({
                'messages': messages
            }),
            success: function (data) {
                var reply = data.choices[0].message.content;
                $('#chat-output').text(reply);
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Error: ' + errorThrown);
            }
        });
    });

    // Edit API
    $('#edit-btn').click(function () {
        var content = $('#edit-content').val();
        var model = 'gpt-3.5-turbo';

        $.ajax({
            url: apiUrl + 'edits',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);
            },
            contentType: 'application/json',
            data: JSON.stringify({
                'model': model,
                'document': content
            }),
            success: function (data) {
                var result = data.editor;
                $('#edit-output').text(result);
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Error: ' + errorThrown);
            }
        });
    });

    // Image API
    $('#image-btn').click(function () {
        var prompt = $('#image-prompt').val();
        var model = 'davinci';

        $.ajax({
            url: apiUrl + 'images/v1/create',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);
            },
            contentType: 'application/json',
            data: JSON.stringify({
                'prompt': prompt,
                'model': model
            }),
            success: function (data) {
                var imageUrl = data.output.url;
                $('#image-output').attr('src', imageUrl);
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Error: ' + errorThrown);
            }
        });
    });

    // Embeddings API
    $('#embeddings-btn').click(function () {
        var text = $('#embeddings-text').val();

        $.ajax({
            url: apiUrl + 'engines/davinci-codex/completions',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);
            },
            contentType: 'application/json',
            data: JSON.stringify({
                'documents': [text],
                'options': {
                    'return_embeddings': true
                }
            }),
            success: function (data) {
                var embeddings = data.choices[0].document_embedding;
                $('#embeddings-output').text(embeddings);
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Error: ' + errorThrown);
            }
        });
    });

    // Audio API
    $('#audio-btn').click(function () {
        var text = $('#audio-text').val();

        $.ajax({
            url: apiUrl + 'tts/engines/davinci-codex/completions',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);
            },
            contentType: 'application/json',
            data: JSON.stringify({
                'prompt': text,
                'voice': 'en-GB-Wavenet-A'
            }),
            success: function (data) {
                var audioUrl = data.choices[0].audio;
                $('#audio-output').attr('src', audioUrl);
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Error: ' + errorThrown);
            }
        });
    });

    // Files API
    $('#files-btn').click(function () {
        $.ajax({
            url: apiUrl + 'files',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);
            },
            success: function (data) {
                var files = data.data;
                var fileList = '';
                for (var i = 0; i < files.length; i++) {
                    fileList += '<li>' + files[i].id + ': ' + files[i].filename + '</li>';
                }
                $('#files-output').html('<ul>' + fileList + '</ul>');
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Error: ' + errorThrown);
            }
        });
    });

    // Fine-tunes API
    $('#finetunes-btn').click(function () {
        var model = $('#finetunes-model').val();
        var dataset = $('#finetunes-dataset').val();

        $.ajax({
            url: apiUrl + 'fine-tunes',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);
            },
            contentType: 'application/json',
            data: JSON.stringify({
                'model': model,
                'dataset': dataset
            }),
            success: function (data) {
                var modelId = data.model;
                $('#finetunes-output').text('Fine-tuned model ID: ' + modelId);
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Error: ' + errorThrown);
            }
        });
    });

    // Moderations API
    $('#moderations-btn').click(function () {
        var text = $('#moderations-text').val();

        $.ajax({
            url: apiUrl + 'content/moderations',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);
            },
            contentType: 'application/json',
            data: JSON.stringify({
                'text': text
            }),
            success: function (data) {
                var moderationResult = data.result;
                $('#moderations-output').text(moderationResult);
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Error: ' + errorThrown);
            }
        });
    });

    // Engines API
    $('#engines-btn').click(function () {
        $.ajax({
            url: apiUrl + 'engines',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);
            },
            success: function (data) {
                var engines = data.data;
                var engineList = '';
                for (var i = 0; i < engines.length; i++) {
                    engineList += '<li>' + engines[i].id + ': ' + engines[i].display_name + '</li>';
                }
                $('#engines-output').html('<ul>' + engineList + '</ul>');
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Error: ' + errorThrown);
            }
        });
    });

});