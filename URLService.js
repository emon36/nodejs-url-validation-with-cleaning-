const links = [
    'https://www.prothomalo.com/sports/cricket/yejheivovvX'
];
const domains = [
    {
      domain: 'prothomalo.com',
      aliases: [
        'www.prothomalo.com',
        'news.prothomalo.com',
        'editorial.prothomalo.com'
      ]
    },
    {
      domain: 'lulu.com',
      aliases: [
        'www.lulu.com',
        'mitti.lulu.com',
        'meow.lulu.com'
      ]
    },
  
];

clg = console.log;

async function audit(str){
    try {
        clg(`Provided String: ${str}`);
        let url = str;

        // Validate this domain
        if(!domainValidator(url)){
            throw new Error('Domain is not valid');
        }

        const urlObject = urlProps(url);
        
        // Check url has params or not
        if(url.includes('?')){
            // Remove params
            url = removeParams(url);
        }

        clg(url);

        // Check url exists in db or not
        if(links.includes(url)){
            throw new Error('Link already in Database.')
        }

        // Check whitelisted properties
        if(!checkWhitelist(urlObject)){
            throw new Error('Not Whitelisted');
        }

        







    } catch (error) {
        console.log(error);
    }
}

// Domain Validator
function domainValidator(str)
{
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(str);
}

function removeParams(str)
{
    return str.replace(/#.*$/, '').replace(/\?.*$/, '');
}

function urlProps(url){
    let newURL = new URL(url);

    // newURL.rootDomain = rootDomainMaker(newURL.hostname);

    return {
        href: newURL.href,
        origin: newURL.origin,
        protocol: newURL.protocol,
        host: newURL.host,
        hostname: newURL.hostname,
        hostRoot: rootDomainMaker(newURL.hostname),
        port: newURL.port,
        pathname: newURL.pathname,
        search: newURL.search,
        searchParams: newURL.searchParams,
        hash: newURL.hash
    }

}

function rootDomainMaker(fullDomain){
    let rootDomain = fullDomain.split('.');
    return rootDomain.slice(-2).join('.');
}

function checkWhitelist(urlObject){
    // Check root domain exists
    for(let i = 0; i < domains.length; i++){
        if(domains[i].domain == urlObject.hostRoot){
            if(domains[i].aliases.includes(urlObject.hostname)){
                return true;
            }
        }
    }

    return false;
}



(async () => {
    audit('https://akash.prothomalo.com/sports/cricket/yejheivovv?utm_source=fb&fbclid=9943mnb30xhhs2&move=1&')
})();