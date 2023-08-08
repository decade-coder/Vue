const connection = require("../app/database");

class ExamService {
  async getList(offset = 0, size = 10) {
    const statement = `SELECT * FROM e_main`;
    const [result] = await connection.execute(statement, [size, offset]);
    return result;
  }
  async create(content) {
    const statement =
      "INSERT INTO e_main (exam_name,register_start_date,register_end_date,register_information,write_date,write_content,write_place,interview_date,interview_content,interview_place,highest,adequate,write_score,write_rank,interview_score,interview_rank,register_expense,else_expense,remark) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    console.log("---------------", content);
    const [result] = await connection.execute(statement, [
      content.exam_name,
      content.register_start_date || null,
      content.register_end_date || null,
      content.register_information || "",
      content.write_date || null,
      content.write_content || "",
      content.write_place || "",
      content.interview_date || null,
      content.interview_content || "",
      content.interview_place || "",
      content.highest || "",
      content.adequate || "",
      content.write_score || 0,
      content.write_rank || 0,
      content.interview_score || 0,
      content.interview_rank || 0,
      content.register_expense || 0,
      content.else_expense || 0,
      content.remark || "",
    ]);
    return result;
  }
}

module.exports = new ExamService();
