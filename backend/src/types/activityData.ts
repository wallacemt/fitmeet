export type activityType = {
    title: string,
    description: string,
    typeId: string,
    address: string,
    latitude?: number,
    longitude?: number,
    imageFile: Express.Multer.File,
    image: string,
    scheduledDate: string,
    private: boolean,
    userId: string,
}

export type activityTypeUpdate = Partial<activityType>;
