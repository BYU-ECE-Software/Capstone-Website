import type { Coach } from './coach';
import type { Student } from './student';

export interface Team {
    coach: Coach[],
    students: Student[],
    team:
    {
        team_id: number,
        team_number: string,
        school_year: string,
        grading_coach_one: Coach,
        grading_coach_two: Coach,
        ER_director: number, // Coach?
        long_distance_access_code: number,
        caedm_group_folder: number,
        project: number,
        external_review_coach: Coach[],
        logo: string,
        pdf_logo?: string,
        team_name: string,
        email_list: string[],
        team_box_folder: number,
        class_document_folder: number
    }
}