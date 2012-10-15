# jquery-file-upload

A lightweight jquery file upload plugin, based on an iframe to receive data.

## Example: Play Framework (Scala) w/ Twitter Bootstrap

### The input field

The following link element is a Twitter Bootstrap button. It wraps the input field. Luckily here we have a win-win situation: The input field is invisible but located above the Bootstrap button, i.e. clickable. The hover-effect of the Bootstrap button is preserved, because it is a link.

```html
<a class="btn file-upload">
  Upload
  <input type="file" id="my_id" name="upload" />
</a>
```

The id of the input element has to be defined because it is needed to compute the id of the generated iframe (which contains the result of the ajax call).

The url of the form is intentionally not provided with the link (which could be read by the jquery-file-upload plugin). Instead the url is provided with the plugin initialization parameters. This decouples the input field from the UI.

The form will be automatically wrapped around the input field, when initializing the jquey-file-upload script.

### The style {less}

This style is Twitter Bootstrap specific, where buttons may be rendered as links.

```css
a.file-upload {
  position: relative;
  input[type="file"] {
    opacity:0;
    position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
  }
}
```

### Initializing the jquery-file-upload script

The javascipt initializations are typically placed at the end of the html body. This plugin initializer is applied to a file input field. The action (i.e. url of the server side service), the valid file extensions and the callbacks are optionally defined.

```html
<script>
  $(document).ready(function() {
    $('#my_id').fileupload({
      'action': '/profile/upload-photo',
      'onSubmit': function(fileName) {
        console.log('Sending file ' + fileName)
      },
      'onReceive': function(response) {
        console.log( JSON.stringify(response) )
      },
      'onUnsupportedFileExtension': function(currentExtension, validExtensions) {
        console.log('Unsupported file extension: ' + currentExtension +
            '. Valid extensions are: ' + validExtensions) },
      'validExtensions': ['gif', 'png', 'jpg', 'jpeg']
    })
  })
</script>
```
