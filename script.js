const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            switch (true) {
                case entry.target.classList.contains('progress-fill'):
                    entry.target.classList.add('progress-anim');
                    break;
                default:
                    entry.target.classList.add('slide');
            }
        }
    });
});

observer.observe(document.querySelector('.description'));
observer.observe(document.querySelector('.downloads'));
observer.observe(document.querySelector('.progress-fill'));