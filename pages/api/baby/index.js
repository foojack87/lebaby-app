import {
  getSession,
  getAccessToken,
  withApiAuthRequired,
} from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const { user } = await getSession(req, res);

    const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

    switch (req.method) {
      case 'GET':
        const readData = await fetch(`${baseUrl}/findOne`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            jwtTokenString: accessToken,
          },
          body: JSON.stringify({
            dataSource: process.env.MONGODB_DATA_SOURCE,
            database: 'social_butterfly',
            collection: 'users',
          }),
        });

        const readDataJson = await readData.json();

        if (!readDataJson.document.email) {
          await fetch(`${baseUrl}/updateOne`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Request-Headers': '*',
              jwtTokenString: accessToken,
            },
            body: JSON.stringify({
              dataSource: process.env.MONGODB_DATA_SOURCE,
              database: 'social_butterfly',
              collection: 'users',
              filter: { _id: { $oid: readDataJson.document._id } },
              update: {
                $set: {
                  email: user.email,
                  name: user.name,
                  picture: user.picture,
                  nickname: user.nickname,
                },
              },
            }),
          });
          readDataJson.document = {
            ...readDataJson.document,
            email: user.email,
            name: user.name,
            picture: user.picture,
            nickname: user.nickname,
          };
        }

        res.status(200).json(readDataJson.document);
        break;
      case 'PUT':
        const updateData = await fetch(`${baseUrl}/updateOne`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            jwtTokenString: accessToken,
          },
          body: JSON.stringify({
            dataSource: process.env.MONGODB_DATA_SOURCE,
            database: 'social_butterfly',
            collection: 'users',
            filter: { _id: { $oid: req.body._id } },
            update: {
              $set: {
                nickname: req.body.nickname,
                picture: req.body.picture,
                postedAt: req.body.postedAt,
                baby: req.body.baby,
                activity: req.body.activity,
                weightLabels: req.body.weightLabels,
                weightData: req.body.weightData,
                heightLabels: req.body.heightLabels,
                heightData: req.body.heightData,
                headLabels: req.body.headLabels,
                headData: req.body.headData,
              },
            },
          }),
        });

        const updateDataJson = await updateData.json();
        res.status(200).json(updateDataJson);
        break;
      case 'DELETE':
        const deleteData = await fetch(`${baseUrl}/updateOne`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            jwtTokenString: accessToken,
          },
          body: JSON.stringify({
            dataSource: process.env.MONGODB_DATA_SOURCE,
            database: 'social_butterfly',
            collection: 'users',
            filter: {
              _id: { $oid: req.body._id },
              'activity.id': req.body.activityId,
            },
            update: { $pull: { activity: { id: req.body.activityId } } },
          }),
        });
        const deleteDataJson = await deleteData.json();
        res.status(200).json(deleteDataJson);
        break;
      default: //Method Not Allowed
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
