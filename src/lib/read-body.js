let readBody = (req) => new Promise((resolve, reject) => {
    let chunks = [];
    req.on('data', (chunk) => {
        console.log('Chunk: ', chunk.toString());
        chunks.push(chunk);
    });
    req.on('end', () => {
        resolve(Buffer.concat(chunks));
    });
    req.on('error', (err) => {
        reject(err);
    })
});

module.exports = readBody;