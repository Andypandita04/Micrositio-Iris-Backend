class TestingCardDocument {
  constructor({
    id,
    testing_card_id,
    document_name,
    document_url,
    document_type,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.testing_card_id = testing_card_id;
    this.document_name = document_name;
    this.document_url = document_url;
    this.document_type = document_type;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromDatabase(row) {
    return new TestingCardDocument({
      id: row.id,
      testing_card_id: row.testing_card_id,
      document_name: row.document_name,
      document_url: row.document_url,
      document_type: row.document_type,
      created_at: row.created_at,
      updated_at: row.updated_at
    });
  }

  toDatabase() {
    return {
      testing_card_id: this.testing_card_id,
      document_name: this.document_name,
      document_url: this.document_url,
      document_type: this.document_type
    };
  }
}

export default TestingCardDocument;
