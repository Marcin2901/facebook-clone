import Post from "../../classes/Post";



function getRandomDate() {
    const year = 2022;
                            // przedział =>  floor( [0 - 0,999] * (max - min + 1) )   + min
    const month = Math.floor(Math.random() * (new Date().getMonth() + 1));
    const day = Math.floor(Math.random() * (new Date(year, month, 0).getDate())) + 1;
    return new Date(year, month, day);
}

function getRandomImageNumber() {
    return Math.floor(Math.random() * 1000);
}


async function getPosts() {
    const res = await fetch("https://goquotes-api.herokuapp.com/api/v1/random?count=65");
    const data = await res.json()
    return data.quotes.map(quote  => ({body: quote.text, img: `https://picsum.photos/500/300?random=${getRandomImageNumber()}`, date: getRandomDate()}));
}

export default getPosts;