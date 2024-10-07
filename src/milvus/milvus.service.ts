import { BadRequestException, Injectable } from "@nestjs/common";
import { DataType, MilvusClient } from "@zilliz/milvus2-sdk-node";
import { CreateMilvusDto } from "./dto/create-milvus.dto";

@Injectable()
export class MilvusService {
  private readonly milvueClient: MilvusClient;
  constructor(
  ) {
    this.milvueClient = new MilvusClient({
      address: process.env.MILVUS_ADDRESS,
      username: process.env.MILVUS_USERNAME,
      password: process.env.MILVUS_PASSWORD,
      ssl: false,
    });
  }

  async dropCollection(collectionName: string) {
    return await this.milvueClient.dropCollection({
      collection_name: collectionName,
    });
  }

  async findCollection(collectionName: string) {
    const hasCollection = await this.milvueClient.hasCollection({
      collection_name: collectionName,
    });
    return hasCollection;
  }

  async loadCollection(collectionName: string) {
    return await this.milvueClient.loadCollection({
      collection_name: collectionName,
    });
  }

  async insertVector(collectionName: string, milvusData: CreateMilvusDto) {
    try {
      return await this.milvueClient.insert({
        collection_name: collectionName,
        fields_data: [
          {
            id: milvusData.id,
            vector: milvusData.vector,
            name: milvusData.content,
          },
        ]
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException("error");
    }
  }

  async upsertVector(collectionName: string,  milvusData: CreateMilvusDto) {
    try {
      return await this.milvueClient.upsert({
        collection_name: collectionName,
        fields_data: [
          {
            id: milvusData.id,
            vector: milvusData.vector,
            name: milvusData.content,
          },
        ]
      });  
    } catch (err) {
      console.log(err);
      throw new BadRequestException("error");
    }  
  }

  async deleteVector(collectionName: string, inquiryId: number[]) {
    try {
      return await this.milvueClient.delete({
        collection_name: collectionName,
        ids: inquiryId,
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException("error");
    }
  } 

  async vectorSearch(collectionName: string, vector: number[]) {
    const vectorQuery = await this.milvueClient.search({
      collection_name: collectionName,
      vector: vector,
      limit: 5,
      params: {
        efConstruction: 100,
        M: 16,
      },
      output_fields: ["content"],
    });
    return vectorQuery;
  }

  async createCollection(collectionName: string) {
    await this.milvueClient.createCollection({
      collection_name: collectionName,
      fields: [
        {
          name: "id",
          data_type: DataType.Int64,
          autoID: false,
          is_primary_key: true,
        },
        {
          name: "vector",
          data_type: DataType.FloatVector,
          dim: 3072,
        },
        {
          name: "content",
          data_type: DataType.VarChar,
          max_length: 128,
        },
        {
          name: "answer",
          data_type: DataType.VarChar,
          max_length: 2048, 
        }
      ],
    });

    await this.milvueClient.createIndex({
      collection_name: collectionName,
      field_name: "vector",
      index_type: "HNSW",
      params: {
        efConstruction: 100,
        M: 16,
      },
      metric_type: "COSINE",
    });
  }
}
