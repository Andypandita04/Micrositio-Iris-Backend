import supabase from '../config/supabaseClient.js';
import LearningCardDocument from '../models/LearningCardDocument.js';

class LearningCardDocumentRepository {
  static tableName = 'learning_card_documents';

  static async createDocument(documentData) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .insert(documentData)
        .select()
        .single();

      if (error) {
        console.error('Error creating learning card document:', error);
        throw error;
      }

      return LearningCardDocument.fromDatabase(data);
    } catch (error) {
      console.error('Error in createDocument repository:', error);
      throw error;
    }
  }

  static async getDocumentsByLearningCardId(learningCardId) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('learning_card_id', learningCardId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching learning card documents:', error);
        throw error;
      }

      return data ? data.map(doc => LearningCardDocument.fromDatabase(doc)) : [];
    } catch (error) {
      console.error('Error in getDocumentsByLearningCardId repository:', error);
      throw error;
    }
  }

  static async getDocumentById(documentId) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', documentId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No document found
        }
        console.error('Error fetching learning card document by ID:', error);
        throw error;
      }

      return data ? LearningCardDocument.fromDatabase(data) : null;
    } catch (error) {
      console.error('Error in getDocumentById repository:', error);
      throw error;
    }
  }

  static async deleteDocument(documentId) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('id', documentId)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No document found
        }
        console.error('Error deleting learning card document:', error);
        throw error;
      }

      return data ? LearningCardDocument.fromDatabase(data) : null;
    } catch (error) {
      console.error('Error in deleteDocument repository:', error);
      throw error;
    }
  }

  static async updateDocument(documentId, updateData) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update(updateData)
        .eq('id', documentId)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No document found
        }
        console.error('Error updating learning card document:', error);
        throw error;
      }

      return data ? LearningCardDocument.fromDatabase(data) : null;
    } catch (error) {
      console.error('Error in updateDocument repository:', error);
      throw error;
    }
  }
}

export default LearningCardDocumentRepository;
