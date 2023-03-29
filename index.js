const express = require('express');
const app = express();

const PORT = process.env.port || 3000;


function auditURL(str)
{
  const valid = domainValidator(str);
  if(valid)
  {
    const domainListed = domainCheck(str)
    if(domainListed)
    {
      const cleanURL = removeParameter(str)
      
      return cleanURL;
    }else{
      return false
    }
  }else{
    return false
  }
}

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
const domains = ["www.protomalo.com", "www.kalerkonto.com", "www.bd-pratidin.com"];

/* const domains = [
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

] */



function domainCheck(str)
{
   if(domains.includes(str))
   {
    return true
   }else{
    return false
   }
}

function removeParameter(str)
{
    return str.replace(/#.*$/, '').replace(/\?.*$/, '');
}

console.log(auditURL('www.protomalo.com?meow=wow'))

// console.log(domainValidator('http://www.freecodecamp.org/'))

// console.log(domainCheck('www.kalerkonto.co'))

// console.log(removeParameter('http\://www.freecodecamp.org?jielje'))

app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});