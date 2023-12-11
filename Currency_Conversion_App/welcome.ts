import chalkAnimation from "chalk-animation";


let sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 2500);
    })
};

async function welcome() {
    let title = chalkAnimation.karaoke(`        Currency Conversion App\n`);
    await sleep();
    title.stop();
}

export { welcome };