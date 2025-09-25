// Page navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageContents = document.querySelectorAll('.page-content');
    const frameIndicators = document.getElementById('frame-indicators');
    const downBtn = document.getElementById('down-btn');
    const upBtn = document.getElementById('up-btn');
    const frames = document.querySelectorAll('.frame');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentFrame = 1;
    const totalFrames = 4;

    // Function to switch pages
    function switchPage(targetPage) {
        // Remove active class from all nav links and pages
        navLinks.forEach(link => link.classList.remove('active'));
        pageContents.forEach(page => page.classList.remove('active'));

        // Add active class to clicked nav link
        const activeNavLink = document.querySelector(`[data-page="${targetPage}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }

        // Show target page content
        const targetPageContent = document.getElementById(targetPage);
        if (targetPageContent) {
            targetPageContent.classList.add('active');
        }

        // Show/hide frame indicators and buttons only on home page
        if (targetPage === 'home') {
            frameIndicators.classList.remove('hidden');
            updateButtonsVisibility();
        } else {
            frameIndicators.classList.add('hidden');
            downBtn.classList.add('hidden');
            upBtn.classList.remove('visible');
            
            // Hide all sidebar content when leaving home page
            const leftContent1 = document.querySelector('.left-content.frame1-only');
            const rightContent1 = document.querySelector('.right-content.frame1-only');
            const leftContent2 = document.querySelector('.left-content.frame2-only');
            const rightContent2 = document.querySelector('.right-content.frame2-only');
            const leftContent3 = document.querySelector('.left-content.frame3-only');
            const rightContent3 = document.querySelector('.right-content.frame3-only');
            const leftContent4 = document.querySelector('.left-content.frame4-only');
            
            if (leftContent1) leftContent1.style.display = 'none';
            if (rightContent1) rightContent1.style.display = 'none';
            if (leftContent2) leftContent2.style.display = 'none';
            if (rightContent2) rightContent2.style.display = 'none';
            if (leftContent3) leftContent3.style.display = 'none';
            if (rightContent3) rightContent3.style.display = 'none';
            if (leftContent4) leftContent4.style.display = 'none';
            
            // Handle center content padding based on page
            const centerContent = document.querySelector('.center-content');
            if (centerContent) {
                if (targetPage === 'products') {
                    // Products page: remove padding to fill entire area
                    centerContent.style.padding = '0';
                } else {
                    // Other pages: restore normal padding
                    centerContent.style.padding = '40px';
                }
            }
        }
    }

    // Function to switch frames on home page
    function switchFrame(frameNumber) {
        if (frameNumber < 1 || frameNumber > totalFrames) return;
        
        currentFrame = frameNumber;
        
        // Hide ALL frames first
        frames.forEach(frame => {
            frame.classList.remove('active');
            frame.style.display = 'none';
        });
        
        // Show ONLY the target frame
        const targetFrame = document.getElementById(`frame-${frameNumber}`);
        if (targetFrame) {
            targetFrame.classList.add('active');
            if (frameNumber === 1) {
                targetFrame.style.display = 'flex';
            } else {
                targetFrame.style.display = 'block';
            }
        }
        
        // Update indicators
        indicators.forEach(indicator => indicator.classList.remove('active'));
        const activeIndicator = document.querySelector(`[data-frame="${frameNumber}"]`);
        if (activeIndicator) {
            activeIndicator.classList.add('active');
        }
        
        // Show/hide left and right sidebar content based on frame
        const leftContent1 = document.querySelector('.left-content.frame1-only');
        const rightContent1 = document.querySelector('.right-content.frame1-only');
        const leftContent2 = document.querySelector('.left-content.frame2-only');
        const rightContent2 = document.querySelector('.right-content.frame2-only');
        const leftContent3 = document.querySelector('.left-content.frame3-only');
        const rightContent3 = document.querySelector('.right-content.frame3-only');
        const leftContent4 = document.querySelector('.left-content.frame4-only');
        const centerContent = document.querySelector('.center-content');
        
        // Hide all sidebar content first
        if (leftContent1) leftContent1.style.display = 'none';
        if (rightContent1) rightContent1.style.display = 'none';
        if (leftContent2) leftContent2.style.display = 'none';
        if (rightContent2) rightContent2.style.display = 'none';
        if (leftContent3) leftContent3.style.display = 'none';
        if (rightContent3) rightContent3.style.display = 'none';
        if (leftContent4) leftContent4.style.display = 'none';
        
        if (frameNumber === 1) {
            // Frame 1: Show frame 1 sidebar content, remove center padding
            if (leftContent1) leftContent1.style.display = 'flex';
            if (rightContent1) rightContent1.style.display = 'flex';
            if (centerContent) centerContent.style.padding = '0';
        } else if (frameNumber === 2) {
            // Frame 2: Show frame 2 sidebar content, remove center padding
            if (leftContent2) leftContent2.style.display = 'flex';
            if (rightContent2) rightContent2.style.display = 'flex';
            if (centerContent) centerContent.style.padding = '0';
        } else if (frameNumber === 3) {
            // Frame 3: Show frame 3 sidebar content, remove center padding
            if (leftContent3) leftContent3.style.display = 'flex';
            if (rightContent3) rightContent3.style.display = 'flex';
            if (centerContent) centerContent.style.padding = '0';
        } else if (frameNumber === 4) {
            // Frame 4: Show frame 4 left content, remove center padding
            if (leftContent4) leftContent4.style.display = 'flex';
            if (centerContent) centerContent.style.padding = '0';
        } else {
            // Other frames: Hide all sidebar content, restore center padding
            if (centerContent) centerContent.style.padding = '40px';
        }
        
        // Update button visibility
        updateButtonsVisibility();
    }
    
    // Function to update button visibility based on current frame
    function updateButtonsVisibility() {
        if (currentFrame === totalFrames) {
            // Last frame: hide down button, show up button
            downBtn.classList.add('hidden');
            upBtn.classList.add('visible');
        } else {
            // Not last frame: show down button, hide up button
            downBtn.classList.remove('hidden');
            upBtn.classList.remove('visible');
        }
    }

    // Down button click handler
    downBtn.addEventListener('click', function() {
        if (currentFrame < totalFrames) {
            switchFrame(currentFrame + 1);
        }
    });
    
    // Up button click handler (returns to first frame)
    upBtn.addEventListener('click', function() {
        switchFrame(1);
    });

    // Indicator click handlers
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const frameNumber = parseInt(this.getAttribute('data-frame'));
            switchFrame(frameNumber);
        });
    });

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            switchPage(targetPage);
            
            // Reset to first frame when switching back to home
            if (targetPage === 'home') {
                currentFrame = 1;
                switchFrame(1);
            }
        });
    });

    // Initialize with home page active
    switchPage('home');
    switchFrame(1);

    // Product selection functionality for Products page
    const productItems = document.querySelectorAll('.product-item');
    const productDetails = document.querySelectorAll('.product-detail');
    
    productItems.forEach(item => {
        item.addEventListener('click', function() {
            const productType = this.getAttribute('data-product');
            
            // Remove active class from all product items
            productItems.forEach(product => product.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all product details
            productDetails.forEach(detail => detail.classList.remove('active'));
            
            // Show corresponding product detail
            const targetDetail = document.querySelector(`.product-detail[data-product="${productType}"]`);
            if (targetDetail) {
                targetDetail.classList.add('active');
            }
        });
    });
});
