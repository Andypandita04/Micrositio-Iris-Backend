class NodePosition {
  constructor({ id_position, id_secuencia, node_type, node_id, position_x, position_y, created_at, updated_at }) {
    this.id_position = id_position;
    this.id_secuencia = id_secuencia;
    this.node_type = node_type;
    this.node_id = node_id;
    this.position_x = position_x;
    this.position_y = position_y;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export default NodePosition;