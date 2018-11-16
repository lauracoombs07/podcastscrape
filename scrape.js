const puppeteer = require("puppeteer"); // import the puppeteer module 
 
// const BASE_URL = "https://www.podbean.com/";
// const PODCAST_URL = "https://www.podbean.com/podcast-detail/nth28-2ef41/99%25-Invisible-Podcast";
 
// async function scrapeEpisodeLinks() {
//  let browser = await puppeteer.launch({ headless: false }); //headless:false so we can watch the browser as it works 
//  let page = await browser.newPage(); //open a new page
//  await page.goto(PODCAST_URL); //access the podcasts page
// }
 
// scrapeEpisodeLinks()

//SECOND STEP NO ACTUAL LINKS
const BASE_URL = "https://www.podbean.com/";
const PODCAST_URL = "https://www.podbean.com/podcast-detail/nth28-2ef41/99%25-Invisible-Podcast";
 
async function scrapeEpisodeLinks() {
 let browser = await puppeteer.launch({ headless: false }); //headless:false so we can watch the browser as it works 
 let page = await browser.newPage(); //open a new page
 await page.goto(PODCAST_URL); //access the podcasts page
 
 let episodes_details = await page.evaluate(() => {
   //Extract each episode's basic details
   let table = document.querySelector(".items");
   let episode_panels = Array.from(table.children); 
   
   // Loop through each episode and get their details 
   let episodes_info = episode_panels.map(episode_panel => {
     let title = episode_panel.querySelector(".listen-now").textContent;
     let datetime = episode_panel.querySelector(".datetime").textContent;
     let episode_download_page = episode_panel
       .querySelector(".download")
       .getAttribute("href");
     return { title, datetime, episode_download_page };
   });
   return episodes_info;
 });
 
 console.log(episodes_details)
 // Close the browser when everything is done 
 await browser.close() 
}
 
scrapeEpisodeLinks()

// const BASE_URL = "https://www.podbean.com/";
// const PODCAST_URL = "https://www.podbean.com/podcast-detail/nth28-2ef41/99%25-Invisible-Podcast";
 
// async function getDownloadLink(page, url) {
//  await page.goto(url);
//  let download_link = await page.evaluate(() => {
//    let download_btn = document.querySelector(".download-btn");
//    return download_btn.getAttribute("href");
//  });
//  return download_link;
// }
 
// async function scrapeEpisodeLinks() {
//  let browser = await puppeteer.launch({ headless: false }); //headless:false so we can debug
//  let page = await browser.newPage(); //open a new page
//  await page.goto(PODCAST_URL);
//  let episodes_details = await page.evaluate(() => {
//      //Extract each episode's basic details
//      let table = document.querySelector(".items");
//      let episode_panels = Array.from(table.children); 
   
//      // Loop through each episode and get their details 
//      let episodes_info = episode_panels.map(episode_panel => {
//      let title = episode_panel.querySelector(".listen-now").textContent;
//      let datetime = episode_panel.querySelector(".datetime").textContent;
//      let episode_download_page = episode_panel
//        .querySelector(".download")
//        .getAttribute("href");
//      return { title, datetime, episode_download_page };
//    });
//    return episodes_info;
//  }); 
 
//  // Loop through all episodes and get actual download link for each episode
//  let episodes = [];
//  for (let episode of episodes_details) {
//    let download_link = await getDownloadLink(
//      page,
//      BASE_URL + episode_details["episode_download_page"] // Since download page is not a full url, we need to prepend it with the base url for podbean 
//    );
//    episode_details["download_link"] = download_link;
//    episodes.push(episode_details);
//  }
//  console.log(episodes)
//  await browser.close()
// } 