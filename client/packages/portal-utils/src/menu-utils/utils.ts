import {AppGroup} from '@equinor/portal-core';

export const getColumnCount = (data?: AppGroup[]) => {
    if (!data || data.length < 3) {
        return 1;
    }
    if (data?.length > 3 && data?.length < 10) {
        return 2;
    }
    return 3;
};

export const getMenuWidth = (data?: AppGroup[]) => {
    if (!data || data.length < 3) {
        return 750;
    }
    if (data.length > 3 && data?.length < 10) {
        return 1100;
    }
    return 1450;
};

export const customAppgroupArraySort = (a: AppGroup, b: AppGroup, activeItem: string) => {
    if (a.name === activeItem) {
        return -1;
    } else if (b.name === activeItem) {
        return 1;
    }

    if (a.order < b.order) {
        return -1;
    } else if (a.order > b.order) {
        return 1;
    } else {
        return 0;
    }
};