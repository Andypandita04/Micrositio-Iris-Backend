class LearningCardDocument {
  constructor({
    id,
    learning_card_id,
    document_name,
    document_url,
    document_type,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.learning_card_id = learning_card_id;
    this.document_name = document_name;
    this.document_url = document_url;
    this.document_type = document_type;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromDatabase(row) {
    return new LearningCardDocument({
      id: row.id,
      learning_card_id: row.learning_card_id,
      document_name: row.document_name,
      document_url: row.document_url,
      document_type: row.document_type,
      created_at: row.created_at,
      updated_at: row.updated_at
    });
  }

  toDatabase() {
    return {
      learning_card_id: this.learning_card_id,
      document_name: this.document_name,
      document_url: this.document_url,
      document_type: this.document_type
    };
  }
}

export default LearningCardDocument;
