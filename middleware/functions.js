// TODO: make non-injectable
const getUserData = async (req, user_id, ...fields) => {
  const fieldsString = fields.join(",");
  const results = await req.client.query({
    text: `select ${fieldsString} from users where id = ${user_id}`,
  });
  if (results.rows.length > 0) {
    const row = results.rows[0];
    return fields.map((field) => row[field]);
  }
};

// TODO: make non-injectable
const getSourceData = async (req, source_id, ...fields) => {
  const fieldsString = fields.join(",");
  const results = await req.client.query({
    text: `select ${fieldsString} from sources where id = ${source_id}`,
  });
  if (results.rows.length > 0) {
    const row = results.rows[0];
    return fields.map((field) => row[field]);
  }
};

module.exports = { getUserData, getSourceData };
