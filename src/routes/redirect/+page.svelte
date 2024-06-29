<script>
    import Button from '../../lib/components/ui/button/button.svelte'
    import Switch from '../../lib/components/ui/switch/switch.svelte'
</script>
<div class="main">
    <div class="wrapper">
        <div class="content">
            <div class="target">
                <div class="text">
                    <h1>Redirecting...</h1>
                    <p>You will see the requested content shortly.</p>
                </div>
                <div class="banner">
                    <div class="banner-content">
                        <img src="/fried-shrimp.png" alt="Fried shrimp" class="banner-image"/>
                        <div class="banner-text">
                            <span>Fried shrimps</span>
                            <ul>
                                <li>yummy</li>
                                <li>crunchy</li>
                                <li>ready in 15 minutes</li>
                            </ul>
                        </div>
                    </div>
                    <div class="banner-deal">
                        <span class="banner-price">$4.99<span class="banner-old-price">$9.99</span></span>
                        <button class="banner-action">Order now</button>
                    </div>
                </div>
            </div>
            <p class="disclaimer">
                Paid advertisement. Want to remove this banner? <br>Upgrade to <a href="/pro">LinkLink Pro</a>.
            </p>
        </div>
    </div>
</div>
<style>
    .main {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
    .wrapper {
        display: flex;
        justify-content: center;
        width: 100%;
        flex-direction: column;
        flex-grow: 1;
        align-items: center;
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50rem;
        gap: 0.5rem;
    }
    h1 {
        font-weight: 600;
        text-align: center;
        font-size: 2rem;
    }
    p {
        font-size: 1.5rem;
        font-weight: 600;
        opacity: 0.75;
    }
    span {
        font-size: 1.25rem;
    }
    .text {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    .disclaimer {
        text-align: center;
        opacity: 0.5;
        font-size: 1rem;
        font-weight: 500;
    }
    a {
        text-decoration: underline;
    }
    .target {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    ul {
        list-style-type: disc;
        list-style-position: inside;
    }
    .banner {
        width: 29.75rem;
        display: flex;
        justify-content: space-between;
        background: #dadada;
        border-radius: 0.5rem;
        padding: 1.5rem;
    }
    .banner-content {
        display: flex;
        gap: 1.5rem;
        align-items: center;
    }
    .banner-image {
        width: 48px;
        height: 48px;
    }
    .banner-text {
        font-weight: 600;
    }
    .banner-deal {
        display: flex;
        flex-direction: column;
        align-content: space-between;
    }
    .banner-price {
        display: flex;
        font-size: 2rem;
        font-weight: 600;
    }
    .banner-old-price {
        font-size: 1rem;
        opacity: 0.5;
        text-decoration: line-through;
    }
    .banner-action {
        background: #F37C5A;
        color: #FFFFFF;
        padding: 0.75rem;
        width: 100%;
        border-radius: 0.75rem;
    }
    .header-link {
        text-decoration: none;
    }
</style>
