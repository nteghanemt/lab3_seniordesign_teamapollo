module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Lab3 Doodle Poll",
  },
  plugins: [
    {
      resolve: 'gatsby-source-firestore',
      options: {
        credential: require('./lab3-doodle-poll-firebase-adminsdk-zz47t-e25958f747.json'),
        types: [
          {
            type: 'Polls',
            collection: 'Polls',
            map: doc=> ({
              name: doc.Name,
              blocks: doc.Blocks,
              day: doc.Day,
              endtime: doc.EndTime,
              location: doc.Location,
              notes: doc.Notes,
              starttime: doc.StartTime
            })
          }
        ]
      }
    }
  ],
};
