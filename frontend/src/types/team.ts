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
        grading_coach_one: Coach | null,
        grading_coach_two: Coach | null,
        ER_director: number | null, // Coach?
        long_distance_access_code: number | null,
        caedm_group_folder: number | null,
        project: number | null,
        external_review_coach: Coach[],
        logo: string,
        pdf_logo?: string,
        team_name: string,
        email_list: string[],
        team_box_folder: number | null,
        class_document_folder: number | null,
    }
}