get = id => document.getElementById(id);

function author_node(author) {
    var span = document.createElement("span");
    var a = document.createElement("a");
    var sup = document.createElement("sup");
    a.textContent = author.name;
    a.href = author.email;
    sup.textContent = author.footnote.map(String).join(",");
    sup.textContent += author.affiliations.map(String).join(",");
    span.appendChild(a);
    span.appendChild(sup);
    return span
}

function affiliations_node(affiliations) {
    var span = document.createElement("span");
    span.innerHTML = affiliations.map((affiliation, index) => 
        "<sup>" + (index + 1).toString() + "</sup>" + affiliation
    ).join(", ");
    return span
}

function footnote_node(footnotes) {
    var span = document.createElement("span");
    span.innerHTML = footnotes.map((footnote, index) => 
        "<sup>" + (index) + "</sup>" + footnote
    ).join(", ");
    return span
}

function copy_bibtex() {
    var range = document.createRange();
    range.selectNode(get("bibtex"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}


function make_site(paper){
    document.title = paper.title;
    get("title").textContent = paper.title;
    get("conference").textContent = paper.conference;
    paper.authors.map((author, index) => {
        node = author_node(author);
        get("author-list").appendChild(node);
        if(index == paper.authors.length - 1) return;
        node.innerHTML += ", "
    })
    get("affiliation-list").appendChild(affiliations_node(paper.affiliations));
    //get("footnote-list").appendChild(footnote_node(paper.footnote));
    //get("abstract").textContent = paper.abstract;
    for(var button in paper.URLs) {
        node = get(button);
        url = paper.URLs[button];
        if(url == null) node.remove();
        else node.href = url;
    }
    //get("video").src = paper.URLs.youtube.replace('.be','be.com/embed/');
    get("copy-button").onclick = copy_bibtex;
}

function set_slider(root) {
    const slidesContainer = root.querySelector(".slides-container");
    const slide = root.querySelector(".slide");
    const prevButton = root.querySelector(".slide-arrow-prev");
    const nextButton = root.querySelector(".slide-arrow-next");
    nextButton.addEventListener("click", (event) => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft += slideWidth;
    });
    prevButton.addEventListener("click", () => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft -= slideWidth;
    });
}
sliders = document.getElementsByClassName("slider-wrapper")
for (var i = 0; i < sliders.length; i++) set_slider(sliders[i])

// Read JSON
make_site({
    "title": "Generative Rendering: Controllable 4D-Guided Video Generation with 2D Diffusion Models",
    "conference": "Under Submission",
    "authors": [
        {
            "name": "Shengqu Cai",
            "email": "https://primecai.github.io/",
            "affiliations": ["1", "2"],
            "footnote": ["*"]
        },
        {
            "name": "Duygu Ceylan",
            "email": "https://duygu-ceylan.com/",
            "affiliations": ["2"],
            "footnote": ["*"]
        },
        {
            "name": "Matheus Gadelha",
            "email": "http://mgadelha.me/",
            "affiliations": ["2"],
            "footnote": ["*"]
        },
        {
            "name": "Chun-Hao Huang",
            "email": "https://paulchhuang.wixsite.com/chhuang",
            "affiliations": ["2"],
            "footnote": [""]
        },
        {
            "name": "Tuanfeng Wang",
            "email": "https://tuanfeng.github.io/",
            "affiliations": ["2"],
            "footnote": [""]
        },
        {
            "name": "Gordon Wetzstein",
            "email": "https://stanford.edu/~gordonwz/",
            "affiliations": ["1"],
            "footnote": [""]
        }
    ],
    "affiliations": ["Stanford University", "Adobe Research"],
    "footnote": ["joint first authors"],
    "URLs": {
        "arxiv": "https://arxiv.org/"
    },
    "abstract": "Traditional 3D content creation tools empower users to bring their imagination to life by giving them direct control over a scene's geometry, appearance, motion, and camera path. Creating computer-generated videos, however, is a tedious manual process, which can be automated by emerging text-to-video diffusion models. Despite great promise, video diffusion models are difficult to control, hindering a user to apply their own creativity rather than amplifying it. To address this challenge, we present a novel approach that combines the controllability of dynamic 3D meshes with the expressivity and editability of emerging diffusion models. For this purpose, our approach takes an animated, low-fidelity rendered mesh as input and injects the ground truth correspondence information obtained from the dynamic mesh into various stages of a pre-trained text-to-image generation model to output high-quality and temporally consistent frames. We demonstrate our approach on various examples where motion can be obtained by animating rigged assets or changing the camera path. "
})
//fetch("./paper.json").then(response => response.json).then(json => make_site(json));
