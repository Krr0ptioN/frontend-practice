const ACCESS_KEY = '-4r31aV_7rh5LWLkK5Njagm1wvh4NiaVtdnMpjedQmE'
const SECRET_KEY = 'RuugJKX1WVuJNfLAUdMBouU_P6dy2SGLHv29aM-vyj4'
const UNSPLASH_ROOT = 'https://api.unsplash.com'

function hideLoading() {
    $('.loader-container').addClass('hidden');
};

function showLoading() {
    $('.loader-container').removeClass('hidden');
};

// TODO Initiatal request for images
// - After the completion of fetch request, hide the loading indcator.

// TODO Fetch images
async function fetchRandomImage(count) {
    try {
        const response = await fetch(`${UNSPLASH_ROOT}/photos/random?count=${count}&client_id=${ACCESS_KEY}`, {
            headers: {
                'Authorization': `${ACCESS_KEY}`,
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        hideLoading();

        const data = response.json();

        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

function hasSeenPercentageOfLastElement(percentage) {
    var lastElement = $('.post-container').children().last();
    var element = $(window);
    var windowHeight = element.height();
    var scrollTop = element.scrollTop();
    var lastElementTop = lastElement.position().top;
    var lastElementHeight = lastElement.height();
    var threshold = lastElementTop + lastElementHeight * (percentage / 100);
    return scrollTop + windowHeight >= threshold;
}

function createPost({ userFullname, username, location, imageURL, likeCount, description, altDescription }) {
    var $postTemplate = $(".post-template");
    var $post = $postTemplate.clone().removeClass("post-template").removeClass("post-hidden");
    $post.find(".post-user-fullname").text(userFullname);
    $post.find(".post-username").text(username);
    $post.find(".post-location").text(location);
    $post.find(".post-image img").attr("src", imageURL);
    $post.find(".post-image img").attr("alt", altDescription);
    $post.find(".like-number").text(likeCount);
    $post.find(".post-description").text(description);
    return $post;
}

async function appendResults() {
    try {
        const result = await fetchRandomImage(5); // You need to await the result here
        result.forEach(post => {
            let $newPost = createPost(
                {
                    userFullname: post.user.name,
                    username: "@" + post.user.username,
                    location: post.location.name,
                    imageURL: post.urls.regular,
                    likeCount: post.likes,
                    description: post.description,
                    altDescription: post.alt_description,
                }
            );
            console.log("ready to append");
            $newPost.appendTo(".post-container");
        });
    } catch (error) {
        console.error('Error:', error);
    }
}


appendResults();

$(window).on('scroll', function() {
    if (hasSeenPercentageOfLastElement(20)) {
        appendResults();
    }
});
