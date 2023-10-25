document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const button = $('#btn-start');

    async function selectMediaStream() {
        try {
            const mediaStream = await navigator.mediaDevices.getDisplayMedia();
            video.srcObject = mediaStream;
            video.onloadedmetadata = () => video.play();
        } catch (err) {
            console.error(err);
        }
    }

    button.click(async function() {
        button.prop('disabled', true); // Use .prop() to disable the button
        await video.requestPictureInPicture();
        button.prop('disabled', false); // Use .prop() to enable the button
    });

    selectMediaStream();
});
