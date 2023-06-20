import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDTO } from '../dto/create-user.dto';

const dotenv = require('dotenv');
const { Client } = require('@notionhq/client');
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {} // Inject the PrismaService
  async createUser(CreateUserDTO: CreateUserDTO): Promise<User> {
    try {
      const newUser: User = await this.prisma.user.create({
        data: CreateUserDTO,
      });
      return newUser;
    } catch (error) {
      if (error.code === 'P2021') {
        throw new NotFoundException('User already exists');
      }
    }
  }

  async deleteUser(id: string) {
    const deletedUser = await this.prisma.user.delete({
      where: { id: id },
      include: { Task: true }, // Include the associated Task for deletion
    });
    return deletedUser;
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      include: { Task: true }, //
    });
    return users;
  }
  async getNotionData() {
    const { results } = await notion.databases.query({
      database_id: databaseId,
    });
    console.log(results, 'results');
    return results.map((ele) => {
      return {
        id: ele?.id,
        name: ele?.properties?.Name?.title?.[0]?.text?.content,
        clientPhone:
          ele?.properties?.[`Client #`]?.rollup?.array?.[0]?.phone_number,
        contactName:
          ele?.properties?.[`Contact Name`]?.rollup?.array?.[0]?.title?.[0]
            ?.text?.content,
        contactNumber:
          ele?.properties?.[`Contact #`]?.rollup?.array?.[0]?.phone_number,
      };
    });
  }

  async createNotionRecord() {
    try {
      const response = await notion.pages.create({
        parent: {
          database_id: databaseId,
        },
        properties: {
          // Add the properties and values for the new record here
          // Replace "Property Name" and "Property Value" with actual values
          // The property names should match the schema of your database
          Name: {
            id: 'title',
            type: 'title',
            title: [
              {
                type: 'text',
                text: {
                  content: 'from Back-end 2',
                  link: null,
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: 'default',
                },
                plain_text: 'Appointment',
                href: null,
              },
            ],
          },
          Client: {
            id: 'IL%3CT',
            type: 'relation',
            relation: [
              {
                id: 'fbadd486-df4e-4558-a50a-00622d3a4436',
              },
            ],
            has_more: false,
          },
          // Add more properties as needed
        },
      });
      return response;
    } catch (error) {
      console.error('Error creating record:', error);
    }
  }

  async deleteRow() {
    try {
      return await notion.pages.update({
        page_id: '091081ef-074c-4c9d-924a-c01d038ee8cc',
        archived: true, // Set archived to true to delete the row
      });
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  }

  async updateRow() {
    try {
      return await notion.pages.update({
        page_id: 'acf1d326-fbe1-49db-9241-28adb68430b3',
        properties: {
          Name: {
            id: 'title',
            type: 'title',
            title: [
              {
                type: 'text',
                text: {
                  content: 'from Back-end after update',
                  link: null,
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: 'default',
                },
                plain_text: 'from Back-end after update',
                href: null,
              },
            ],
          },
        },
      });
    } catch (error) {
      console.error('Error updating row property:', error);
    }
  }
}
